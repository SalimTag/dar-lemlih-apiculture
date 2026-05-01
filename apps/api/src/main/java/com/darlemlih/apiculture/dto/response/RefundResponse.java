package com.darlemlih.apiculture.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class RefundResponse {
    private String refundId;
    private String status;
    private BigDecimal amount;
    private String reason;
    private String paymentIntentId;
}
