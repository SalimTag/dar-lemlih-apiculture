package com.darlemlih.apiculture.dto.request;

import lombok.Data;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
public class CreatePaymentRequest {
    
    @NotNull(message = "Order ID is required")
    private String orderId;
    
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;
    
    @NotNull(message = "Currency is required")
    private String currency = "MAD";
    
    private String successUrl;
    private String cancelUrl;
}
