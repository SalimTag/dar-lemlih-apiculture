package com.darlemlih.apiculture.payments;

import java.math.BigDecimal;

public interface PaymentGateway {
    PaymentSession createCheckoutSession(String orderId, BigDecimal amount, String currency, String successUrl, String cancelUrl);
    boolean verifyWebhook(String signature, String payload);
    RefundResult refund(String paymentIntentId, BigDecimal amount);
}
