package com.darlemlih.apiculture.payments;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentSession {
    private String sessionId;
    private String paymentIntentId;
    private String checkoutUrl;
    private String status;
}
