package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.cart.*;
import com.darlemlih.apiculture.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCart(userDetails.getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartDto> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(userDetails.getUsername(), request));
    }

    @PutMapping("/update")
    public ResponseEntity<CartDto> updateCartItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(cartService.updateCartItem(userDetails.getUsername(), request));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<CartDto> removeFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeFromCart(userDetails.getUsername(), productId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        cartService.clearCart(userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
