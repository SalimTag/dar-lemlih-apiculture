package com.darlemlih.apiculture.services;

import com.darlemlih.apiculture.dto.request.CreatePaymentRequest;
import com.darlemlih.apiculture.dto.response.PaymentSessionResponse;
import com.darlemlih.apiculture.dto.response.RefundResponse;
import com.darlemlih.apiculture.entities.Order;
import com.darlemlih.apiculture.entities.enums.OrderStatus;
import com.darlemlih.apiculture.exceptions.BadRequestException;
import com.darlemlih.apiculture.exceptions.NotFoundException;
import com.darlemlih.apiculture.exceptions.UnauthorizedException;
import com.darlemlih.apiculture.payments.PaymentGateway;
import com.darlemlih.apiculture.payments.PaymentSession;
import com.darlemlih.apiculture.payments.RefundResult;
import com.darlemlih.apiculture.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PaymentService {

    private final PaymentGateway paymentGateway;
    private final OrderRepository orderRepository;

    @Value("${payment.stripe.success-url}")
    private String defaultSuccessUrl;

    @Value("${payment.stripe.cancel-url}")
    private String defaultCancelUrl;

    /**
     * URL allow-list root. Only success/cancel URLs that start with one of these
     * prefixes are accepted, to prevent open-redirects via Stripe's hosted page.
     */
    @Value("${app.web-base-url}")
    private String webBaseUrl;

    @Value("${app.base-url}")
    private String apiBaseUrl;

    public PaymentSessionResponse createPaymentSession(CreatePaymentRequest request, String principalEmail) {
        log.info("Creating payment session for order: {}", request.getOrderId());

        Order order = findOrder(request.getOrderId())
                .orElseThrow(() -> new NotFoundException("ORDER_NOT_FOUND", "Order not found: " + request.getOrderId()));

        // Ownership check: only the order owner may create a payment session for it.
        if (order.getUser() == null || !order.getUser().getEmail().equalsIgnoreCase(principalEmail)) {
            throw new UnauthorizedException("ORDER_FORBIDDEN", "You do not own this order");
        }

        // Reject completed/cancelled orders.
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("ORDER_NOT_PAYABLE",
                    "Order is in status " + order.getStatus() + " and cannot be paid again");
        }

        String successUrl = validateRedirectUrl(request.getSuccessUrl(), defaultSuccessUrl, "successUrl");
        String cancelUrl = validateRedirectUrl(request.getCancelUrl(), defaultCancelUrl, "cancelUrl");

        // Use trusted order data; reject mismatched amount.
        if (request.getAmount() != null && order.getTotal() != null
                && request.getAmount().compareTo(order.getTotal()) != 0) {
            throw new BadRequestException("AMOUNT_MISMATCH",
                    "Requested amount does not match order total");
        }

        PaymentSession session = paymentGateway.createCheckoutSession(
                order.getOrderNumber(),
                order.getTotal(),
                order.getCurrency(),
                successUrl,
                cancelUrl
        );

        // Persist BOTH the Stripe session id (primary lookup for webhook) and any
        // payment_intent id that was synchronously available.
        order.setStripeSessionId(session.getSessionId());
        if (session.getPaymentIntentId() != null) {
            order.setPaymentIntentId(session.getPaymentIntentId());
        }
        orderRepository.save(order);

        log.info("Payment session created: {}", session.getSessionId());

        return PaymentSessionResponse.builder()
                .sessionId(session.getSessionId())
                .paymentIntentId(session.getPaymentIntentId())
                .checkoutUrl(session.getCheckoutUrl())
                .status(session.getStatus())
                .amount(order.getTotal())
                .currency(order.getCurrency())
                .orderId(order.getOrderNumber())
                .build();
    }

    public PaymentSessionResponse getPaymentStatus(String sessionId) {
        Order order = orderRepository.findByStripeSessionId(sessionId)
                .orElseThrow(() -> new NotFoundException("SESSION_NOT_FOUND", "Unknown payment session"));
        return PaymentSessionResponse.builder()
                .sessionId(sessionId)
                .paymentIntentId(order.getPaymentIntentId())
                .status(order.getStatus().name().toLowerCase())
                .amount(order.getTotal())
                .currency(order.getCurrency())
                .orderId(order.getOrderNumber())
                .build();
    }

    public RefundResponse processRefund(String paymentIntentId, String amountStr) {
        Order order = orderRepository.findByPaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new NotFoundException("ORDER_NOT_FOUND",
                        "Order not found for payment intent: " + paymentIntentId));

        BigDecimal refundAmount;
        try {
            refundAmount = (amountStr != null && !amountStr.isBlank())
                    ? new BigDecimal(amountStr)
                    : order.getTotal();
        } catch (NumberFormatException e) {
            throw new BadRequestException("INVALID_AMOUNT", "amount must be a decimal number");
        }
        if (refundAmount.signum() <= 0 || refundAmount.compareTo(order.getTotal()) > 0) {
            throw new BadRequestException("INVALID_AMOUNT",
                    "amount must be positive and not exceed the order total");
        }

        RefundResult result = paymentGateway.refund(paymentIntentId, refundAmount);

        order.setStatus(OrderStatus.REFUNDED);
        orderRepository.save(order);

        log.info("Refund processed: {} for order {}", result.getRefundId(), order.getOrderNumber());

        return RefundResponse.builder()
                .refundId(result.getRefundId())
                .status(result.getStatus())
                .amount(result.getAmount())
                .reason(result.getReason())
                .paymentIntentId(paymentIntentId)
                .build();
    }

    private Optional<Order> findOrder(String orderIdentifier) {
        if (orderIdentifier == null || orderIdentifier.isBlank()) {
            return Optional.empty();
        }
        Optional<Order> byNumber = orderRepository.findByOrderNumber(orderIdentifier);
        if (byNumber.isPresent()) {
            return byNumber;
        }
        try {
            Long id = Long.parseLong(orderIdentifier);
            return orderRepository.findById(id);
        } catch (NumberFormatException ex) {
            return Optional.empty();
        }
    }

    /**
     * Resolve and allow-list redirect URLs. If the caller provided a URL it must
     * start with one of the configured app URLs; otherwise we fall back to the
     * server-side default (which is constructed from {@code app.web-base-url}).
     */
    private String validateRedirectUrl(String providedUrl, String fallback, String fieldName) {
        if (providedUrl == null || providedUrl.isBlank()) {
            return fallback;
        }
        List<String> allowedPrefixes = List.of(webBaseUrl, apiBaseUrl);
        for (String prefix : allowedPrefixes) {
            if (prefix != null && !prefix.isBlank() && providedUrl.startsWith(prefix)) {
                return providedUrl;
            }
        }
        throw new BadRequestException("REDIRECT_NOT_ALLOWED",
                fieldName + " must start with one of the configured app URLs");
    }
}
