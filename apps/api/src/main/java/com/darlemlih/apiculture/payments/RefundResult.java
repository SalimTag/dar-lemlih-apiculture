package com.darlemlih.apiculture.payments;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefundResult {
    private String refundId;
    private String status;
    private BigDecimal amount;
    private String reason;
}
