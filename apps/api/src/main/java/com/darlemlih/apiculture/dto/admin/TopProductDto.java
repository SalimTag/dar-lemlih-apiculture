package com.darlemlih.apiculture.dto.admin;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TopProductDto {
    private Long productId;
    private String productName;
    private String productSku;
    private Long totalSold;
    private BigDecimal revenue;
}
