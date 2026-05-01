package com.darlemlih.apiculture.services;

import com.darlemlih.apiculture.dto.request.CreatePaymentRequest;
import com.darlemlih.apiculture.dto.response.PaymentSessionResponse;
import com.darlemlih.apiculture.dto.response.RefundResponse;
import com.darlemlih.apiculture.entities.Order;
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

    public PaymentSessionResponse createPaymentSession(CreatePaymentRequest request) {
        log.info("Creating payment session for order: {}", request.getOrderId());

        // Validate order exists (support both numeric IDs and order numbers)
        Order order = findOrder(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found: " + request.getOrderId()));

        // Use provided URLs or defaults
        String successUrl = request.getSuccessUrl() != null ? request.getSuccessUrl() : defaultSuccessUrl;
        String cancelUrl = request.getCancelUrl() != null ? request.getCancelUrl() : defaultCancelUrl;

        // Use trusted order data to avoid tampering with amount/currency
        if (request.getAmount() != null && order.getTotal() != null
                && request.getAmount().compareTo(order.getTotal()) != 0) {
            log.warn("Requested payment amount {} does not match order total {} for order {}",
                    request.getAmount(), order.getTotal(), order.getOrderNumber());
        }

        // Create payment session
        PaymentSession session = paymentGateway.createCheckoutSession(
                order.getOrderNumber(),
                order.getTotal(),
                order.getCurrency(),
                successUrl,
                cancelUrl
        );

        // Update order with payment intent ID
        order.setPaymentIntentId(session.getPaymentIntentId());
        orderRepository.save(order);

        log.info("Payment session created successfully: {}", session.getSessionId());

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
        log.info("Getting payment status for session: {}", sessionId);
        
        // In a real implementation, you would query Stripe for the session status
        // For now, we'll return a placeholder response
        return PaymentSessionResponse.builder()
                .sessionId(sessionId)
                .status("pending")
                .build();
    }

    public RefundResponse processRefund(String paymentIntentId, String amountStr) {
        log.info("Processing refund for payment intent: {}", paymentIntentId);

        // Find order by payment intent ID
        Order order = orderRepository.findByPaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Order not found for payment intent: " + paymentIntentId));

        // Determine refund amount
        BigDecimal refundAmount = amountStr != null ? 
                new BigDecimal(amountStr) : order.getTotal();

        // Process refund
        RefundResult result = paymentGateway.refund(paymentIntentId, refundAmount);

        log.info("Refund processed successfully: {}", result.getRefundId());

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

        // Prefer matching on human-readable order numbers like ORD-2024-000001
        Optional<Order> byNumber = orderRepository.findByOrderNumber(orderIdentifier);
        if (byNumber.isPresent()) {
            return byNumber;
        }

        try {
            Long id = Long.parseLong(orderIdentifier);
            return orderRepository.findById(id);
        } catch (NumberFormatException ex) {
            log.debug("Order identifier '{}' is not numeric; skipping ID lookup", orderIdentifier);
            return Optional.empty();
        }
    }
}
