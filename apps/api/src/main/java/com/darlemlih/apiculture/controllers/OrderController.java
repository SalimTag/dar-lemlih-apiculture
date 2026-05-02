package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.order.*;
import com.darlemlih.apiculture.services.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Orders", description = "Customer order placement and retrieval")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    @Operation(summary = "List current user's orders")
    public ResponseEntity<Page<OrderDto>> getUserOrders(
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable) {
        return ResponseEntity.ok(orderService.getUserOrders(userDetails.getUsername(), pageable));
    }

    @GetMapping("/{orderNumber}")
    @Operation(summary = "Get a specific order by order number")
    public ResponseEntity<OrderDto> getOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrder(userDetails.getUsername(), orderNumber));
    }

    @PostMapping("/checkout")
    @Operation(summary = "Place an order (checkout)", description = "Creates an order from the current cart with cash-on-delivery support")
    public ResponseEntity<CheckoutResponse> checkout(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CheckoutRequest request) {
        return ResponseEntity.ok(orderService.checkout(userDetails.getUsername(), request));
    }
}
