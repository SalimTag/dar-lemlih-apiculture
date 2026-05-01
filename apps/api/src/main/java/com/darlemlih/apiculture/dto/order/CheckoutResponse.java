package com.darlemlih.apiculture.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutResponse {
    private String orderNumber;
    private String paymentUrl;
    private String sessionId;
    private String status;
}
