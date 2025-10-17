package com.darlemlih.apiculture.services;

import com.darlemlih.apiculture.dto.cart.*;
import com.darlemlih.apiculture.entities.*;
import com.darlemlih.apiculture.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private static final BigDecimal SHIPPING_COST = new BigDecimal("30.00");

    public CartDto getCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createNewCart(user));
        
        return toDto(cart);
    }

    public CartDto addToCart(String userEmail, AddToCartRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (product.getStockQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }
        
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createNewCart(user));
        
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.getProductId()))
                .findFirst()
                .orElse(null);
        
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cart.getItems().add(newItem);
        }
        
        cart = cartRepository.save(cart);
        return toDto(cart);
    }

    public CartDto updateCartItem(String userEmail, UpdateCartItemRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(request.getProductId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));
        
        if (item.getProduct().getStockQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }
        
        item.setQuantity(request.getQuantity());
        cart = cartRepository.save(cart);
        return toDto(cart);
    }

    public CartDto removeFromCart(String userEmail, Long productId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        cart = cartRepository.save(cart);
        return toDto(cart);
    }

    public void clearCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart createNewCart(User user) {
        Cart cart = Cart.builder()
                .user(user)
                .items(new java.util.ArrayList<>())
                .build();
        return cartRepository.save(cart);
    }

    private CartDto toDto(Cart cart) {
        BigDecimal subtotal = cart.getTotal();
        BigDecimal total = subtotal.add(SHIPPING_COST);
        
        return CartDto.builder()
                .id(cart.getId())
                .items(cart.getItems().stream()
                        .map(this::toItemDto)
                        .collect(Collectors.toList()))
                .subtotal(subtotal)
                .shippingCost(SHIPPING_COST)
                .total(total)
                .currency("MAD")
                .totalItems(cart.getTotalItems())
                .build();
    }

    private CartItemDto toItemDto(CartItem item) {
        Product product = item.getProduct();
        BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        
        return CartItemDto.builder()
                .id(item.getId())
                .productId(product.getId())
                .productName(product.getNameFr())
                .productSlug(product.getSlug())
                .productImage(product.getImages().isEmpty() ? null : product.getImages().get(0))
                .unitPrice(product.getPrice())
                .quantity(item.getQuantity())
                .totalPrice(totalPrice)
                .stockQuantity(product.getStockQuantity())
                .build();
    }
}
