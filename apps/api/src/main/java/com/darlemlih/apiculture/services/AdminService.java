package com.darlemlih.apiculture.services;

import com.darlemlih.apiculture.dto.admin.DashboardDto;
import com.darlemlih.apiculture.entities.enums.OrderStatus;
import com.darlemlih.apiculture.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdminService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public DashboardDto getDashboardStats() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfDay = now.toLocalDate().atStartOfDay();
        LocalDateTime startOfWeek = now.minusDays(7);
        LocalDateTime startOfMonth = now.minusDays(30);

        return DashboardDto.builder()
                .todaySales(BigDecimal.ZERO) // Simplified for now
                .weekSales(BigDecimal.ZERO)
                .monthSales(BigDecimal.ZERO)
                .totalOrders(orderRepository.count())
                .pendingOrders(orderRepository.findByStatus(OrderStatus.PENDING, null).getTotalElements())
                .totalCustomers(userRepository.count())
                .totalProducts(productRepository.count())
                .lowStockProducts(0L) // Simplified for now
                .topProducts(new ArrayList<>())
                .build();
    }

    public void seedDatabase() {
        log.info("Database already seeded via Flyway migrations");
    }
}
