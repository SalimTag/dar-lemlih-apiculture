package com.darlemlih.apiculture.dto.order;

import com.darlemlih.apiculture.entities.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Long id;
    private String orderNumber;
    private OrderStatus status;
    private BigDecimal subtotal;
    private BigDecimal shippingCost;
    private BigDecimal discount;
    private BigDecimal total;
    private String currency;
    private String paymentProvider;
    private String trackingNumber;
    private ShippingAddressDto shippingAddress;
    private List<OrderItemDto> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
