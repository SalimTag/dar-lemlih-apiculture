package com.darlemlih.apiculture.repositories;

import com.darlemlih.apiculture.entities.Order;
import com.darlemlih.apiculture.entities.User;
import com.darlemlih.apiculture.entities.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    Page<Order> findByUser(User user, Pageable pageable);
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);
    Optional<Order> findByPaymentIntentId(String paymentIntentId);
}
