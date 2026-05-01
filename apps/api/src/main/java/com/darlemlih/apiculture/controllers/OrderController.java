package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.order.*;
import com.darlemlih.apiculture.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderDto>> getUserOrders(
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable) {
        return ResponseEntity.ok(orderService.getUserOrders(userDetails.getUsername(), pageable));
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrderDto> getOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrder(userDetails.getUsername(), orderNumber));
    }

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponse> checkout(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CheckoutRequest request) {
        return ResponseEntity.ok(orderService.checkout(userDetails.getUsername(), request));
    }
}
