package com.darlemlih.apiculture.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PaymentSessionResponse {
    private String sessionId;
    private String paymentIntentId;
    private String checkoutUrl;
    private String status;
    private BigDecimal amount;
    private String currency;
    private String orderId;
}
