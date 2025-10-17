package com.darlemlih.apiculture.payments;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.Refund;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.RefundCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.List;

@Service
@ConditionalOnProperty(name = "payment.provider", havingValue = "stripe")
@Slf4j
public class StripePaymentGateway implements PaymentGateway {

    @Value("${payment.stripe.secret-key}")
    private String secretKey;

    @Value("${payment.stripe.webhook-secret}")
    private String webhookSecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
        log.info("Stripe payment gateway initialized");
    }

    @Override
    public PaymentSession createCheckoutSession(String orderId, BigDecimal amount, String currency, String successUrl, String cancelUrl) {
        try {
            log.info("Creating Stripe checkout session for order: {} with amount: {} {}", orderId, amount, currency);
            
            // Convert amount to cents (Stripe uses smallest currency unit)
            long amountInCents = amount.multiply(new BigDecimal(100)).longValue();
            
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(successUrl)
                    .setCancelUrl(cancelUrl)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency(currency.toLowerCase())
                                                    .setUnitAmount(amountInCents)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Order #" + orderId)
                                                                    .setDescription("Dar Lemlih Apiculture Products")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .setQuantity(1L)
                                    .build()
                    )
                    .putMetadata("order_id", orderId)
                    .setPaymentIntentData(
                            SessionCreateParams.PaymentIntentData.builder()
                                    .putMetadata("order_id", orderId)
                                    .build()
                    )
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .build();

            Session session = Session.create(params);
            
            log.info("Stripe checkout session created successfully: {}", session.getId());
            
            return PaymentSession.builder()
                    .sessionId(session.getId())
                    .paymentIntentId(session.getPaymentIntent())
                    .checkoutUrl(session.getUrl())
                    .status("pending")
                    .build();
                    
        } catch (StripeException e) {
            log.error("Failed to create Stripe checkout session for order: {}", orderId, e);
            throw new RuntimeException("Failed to create payment session: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean verifyWebhook(String signature, String payload) {
        if (signature == null || webhookSecret == null) {
            log.warn("Missing signature or webhook secret for webhook verification");
            return false;
        }
        
        try {
            Event event = Webhook.constructEvent(payload, signature, webhookSecret);
            log.info("Webhook verified successfully. Event type: {}", event.getType());
            return true;
        } catch (SignatureVerificationException e) {
            log.error("Webhook signature verification failed", e);
            return false;
        }
    }

    @Override
    public RefundResult refund(String paymentIntentId, BigDecimal amount) {
        try {
            log.info("Processing refund for payment intent: {} with amount: {}", paymentIntentId, amount);
            
            // Convert amount to cents
            long amountInCents = amount.multiply(new BigDecimal(100)).longValue();
            
            RefundCreateParams params = RefundCreateParams.builder()
                    .setPaymentIntent(paymentIntentId)
                    .setAmount(amountInCents)
                    .setReason(RefundCreateParams.Reason.REQUESTED_BY_CUSTOMER)
                    .build();

            Refund refund = Refund.create(params);
            
            log.info("Refund processed successfully: {}", refund.getId());
            
            return RefundResult.builder()
                    .refundId(refund.getId())
                    .status(refund.getStatus())
                    .amount(new BigDecimal(refund.getAmount()).divide(new BigDecimal(100))) // Convert back from cents
                    .reason(refund.getReason())
                    .build();
                    
        } catch (StripeException e) {
            log.error("Failed to process refund for payment intent: {}", paymentIntentId, e);
            throw new RuntimeException("Failed to process refund: " + e.getMessage(), e);
        }
    }
}
