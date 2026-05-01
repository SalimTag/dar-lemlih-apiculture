package com.darlemlih.apiculture.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CheckoutRequest {
    @NotNull(message = "Shipping address is required")
    @Valid
    private ShippingAddressDto shippingAddress;
    
    private String notes;
    
    @NotNull(message = "Payment method is required")
    private String paymentMethod;
}
