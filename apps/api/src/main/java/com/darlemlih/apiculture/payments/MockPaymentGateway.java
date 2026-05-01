package com.darlemlih.apiculture.payments;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@ConditionalOnProperty(name = "payment.provider", havingValue = "mock")
public class MockPaymentGateway implements PaymentGateway {

    @Override
    public PaymentSession createCheckoutSession(String orderId, BigDecimal amount, String currency, String successUrl, String cancelUrl) {
        return PaymentSession.builder()
                .sessionId("mock_session_" + UUID.randomUUID())
                .paymentIntentId("pi_mock_" + UUID.randomUUID())
                .checkoutUrl(successUrl + "?mock=true")
                .status("pending")
                .build();
    }

    @Override
    public boolean verifyWebhook(String signature, String payload) {
        return true;
    }

    @Override
    public RefundResult refund(String paymentIntentId, BigDecimal amount) {
        return RefundResult.builder()
                .refundId("refund_mock_" + UUID.randomUUID())
                .status("succeeded")
                .amount(amount)
                .reason("requested_by_customer")
                .build();
    }
}
