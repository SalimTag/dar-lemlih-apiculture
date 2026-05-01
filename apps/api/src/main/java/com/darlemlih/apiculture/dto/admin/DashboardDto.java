package com.darlemlih.apiculture.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDto {
    private BigDecimal todaySales;
    private BigDecimal weekSales;
    private BigDecimal monthSales;
    private Long totalOrders;
    private Long pendingOrders;
    private Long totalCustomers;
    private Long totalProducts;
    private Long lowStockProducts;
    private List<TopProductDto> topProducts;
}
