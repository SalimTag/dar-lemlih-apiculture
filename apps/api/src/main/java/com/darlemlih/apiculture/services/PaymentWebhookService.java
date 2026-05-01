package com.darlemlih.apiculture.services;

import com.darlemlih.apiculture.entities.Order;
import com.darlemlih.apiculture.entities.WebhookEvent;
import com.darlemlih.apiculture.entities.enums.OrderStatus;
import com.darlemlih.apiculture.payments.PaymentGateway;
import com.darlemlih.apiculture.repositories.OrderRepository;
import com.darlemlih.apiculture.repositories.WebhookEventRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PaymentWebhookService {

    private final PaymentGateway paymentGateway;
    private final WebhookEventRepository webhookEventRepository;
    private final OrderRepository orderRepository;
    private final EmailService emailService;
    private final ObjectMapper objectMapper;

    public void processWebhook(String signature, String payload) {
        try {
            // Verify webhook signature
            if (!paymentGateway.verifyWebhook(signature, payload)) {
                throw new RuntimeException("Invalid webhook signature");
            }

            // Parse webhook payload
            JsonNode json = objectMapper.readTree(payload);
            String eventId = json.path("id").asText();
            String eventType = json.path("type").asText();

            // Check for duplicate events (idempotency)
            if (webhookEventRepository.existsByEventId(eventId)) {
                log.info("Webhook event already processed: {}", eventId);
                return;
            }

            // Store webhook event
            WebhookEvent event = WebhookEvent.builder()
                    .provider("stripe")
                    .eventId(eventId)
                    .eventType(eventType)
                    .payload(payload)
                    .signature(signature)
                    .processed(false)
                    .build();
            webhookEventRepository.save(event);

            // Process based on event type
            switch (eventType) {
                case "payment_intent.succeeded":
                case "checkout.session.completed":
                    handlePaymentSuccess(json);
                    break;
                case "payment_intent.payment_failed":
                    handlePaymentFailure(json);
                    break;
                default:
                    log.info("Unhandled webhook event type: {}", eventType);
            }

            // Mark event as processed
            event.setProcessed(true);
            event.setProcessedAt(LocalDateTime.now());
            webhookEventRepository.save(event);

        } catch (Exception e) {
            log.error("Error processing webhook", e);
            throw new RuntimeException("Webhook processing failed", e);
        }
    }

    private void handlePaymentSuccess(JsonNode json) {
        String paymentIntentId = json.path("data").path("object").path("payment_intent").asText();
        
        if (paymentIntentId == null || paymentIntentId.isEmpty()) {
            paymentIntentId = json.path("data").path("object").path("id").asText();
        }

        final String finalPaymentIntentId = paymentIntentId;
        Order order = orderRepository.findByPaymentIntentId(finalPaymentIntentId)
                .orElseThrow(() -> new RuntimeException("Order not found for payment intent: " + finalPaymentIntentId));

        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);

        // Send confirmation email
        emailService.sendOrderConfirmationEmail(order.getUser().getEmail(), order.getOrderNumber());
        
        log.info("Order {} marked as PAID", order.getOrderNumber());
    }

    private void handlePaymentFailure(JsonNode json) {
        final String paymentIntentId = json.path("data").path("object").path("id").asText();
        
        Order order = orderRepository.findByPaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Order not found for payment intent: " + paymentIntentId));

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        
        log.info("Order {} marked as CANCELLED due to payment failure", order.getOrderNumber());
    }
}
