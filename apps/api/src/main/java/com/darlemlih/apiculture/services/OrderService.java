package com.darlemlih.apiculture.services;

import com.darlemlih.apiculture.dto.order.*;
import com.darlemlih.apiculture.entities.*;
import com.darlemlih.apiculture.entities.enums.OrderStatus;
import com.darlemlih.apiculture.payments.PaymentGateway;
import com.darlemlih.apiculture.payments.PaymentSession;
import com.darlemlih.apiculture.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final PaymentGateway paymentGateway;
    private final EmailService emailService;

    @Value("${app.web-base-url}")
    private String webBaseUrl;

    private static final BigDecimal SHIPPING_COST = new BigDecimal("30.00");

    public Page<OrderDto> getUserOrders(String userEmail, Pageable pageable) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return orderRepository.findByUser(user, pageable)
                .map(this::toDto);
    }

    public OrderDto getOrder(String userEmail, String orderNumber) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        return toDto(order);
    }

    public CheckoutResponse checkout(String userEmail, CheckoutRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Verify stock availability
        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + item.getProduct().getNameFr());
            }
        }
        
        // Create order
        Order order = createOrder(user, cart, request);
        
        // Create payment session
        String successUrl = webBaseUrl + "/orders/" + order.getOrderNumber() + "/success";
        String cancelUrl = webBaseUrl + "/checkout";
        
        PaymentSession session = paymentGateway.createCheckoutSession(
                order.getOrderNumber(),
                order.getTotal(),
                order.getCurrency(),
                successUrl,
                cancelUrl
        );
        
        order.setPaymentIntentId(session.getPaymentIntentId());
        orderRepository.save(order);
        
        // Clear cart
        cart.getItems().clear();
        cartRepository.save(cart);

        // Non-blocking emails (confirmation + admin notification)
        try {
            emailService.sendOrderConfirmationEmail(user.getEmail(), order.getOrderNumber());
        } catch (Exception ignored) {}
        try {
            String adminEmail = System.getenv("APP_EMAIL_ADMIN");
            String totalSummary = order.getTotal() + " " + order.getCurrency();
            emailService.sendNewOrderAdminNotification(order.getOrderNumber(), user.getEmail(), totalSummary, adminEmail);
        } catch (Exception ignored) {}

        return CheckoutResponse.builder()
                .orderNumber(order.getOrderNumber())
                .paymentUrl(session.getCheckoutUrl())
                .sessionId(session.getSessionId())
                .status("pending")
                .build();
    }

    private Order createOrder(User user, Cart cart, CheckoutRequest request) {
        BigDecimal subtotal = cart.getTotal();
        BigDecimal total = subtotal.add(SHIPPING_COST);
        
        ShippingAddress shippingAddress = ShippingAddress.builder()
                .name(request.getShippingAddress().getName())
                .phone(request.getShippingAddress().getPhone())
                .line1(request.getShippingAddress().getLine1())
                .line2(request.getShippingAddress().getLine2())
                .city(request.getShippingAddress().getCity())
                .region(request.getShippingAddress().getRegion())
                .postalCode(request.getShippingAddress().getPostalCode())
                .country(request.getShippingAddress().getCountry())
                .build();
        
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .user(user)
                .status(OrderStatus.PENDING)
                .subtotal(subtotal)
                .shippingCost(SHIPPING_COST)
                .discount(BigDecimal.ZERO)
                .total(total)
                .currency("MAD")
                .paymentProvider(request.getPaymentMethod())
                .shippingAddress(shippingAddress)
                .notes(request.getNotes())
                .items(new java.util.ArrayList<>())
                .build();
        
        order = orderRepository.save(order);
        
        // Create order items
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .unitPrice(cartItem.getProduct().getPrice())
                    .totalPrice(cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
                    .build();
            order.getItems().add(orderItem);
            
            // Update stock
            Product product = cartItem.getProduct();
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);
        }
        
        return orderRepository.save(order);
    }

    private String generateOrderNumber() {
        return "ORD-" + LocalDateTime.now().getYear() + "-" + 
               String.format("%06d", (long) (Math.random() * 999999));
    }

    private OrderDto toDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .status(order.getStatus())
                .subtotal(order.getSubtotal())
                .shippingCost(order.getShippingCost())
                .discount(order.getDiscount())
                .total(order.getTotal())
                .currency(order.getCurrency())
                .paymentProvider(order.getPaymentProvider())
                .trackingNumber(order.getTrackingNumber())
                .shippingAddress(toShippingDto(order.getShippingAddress()))
                .items(order.getItems().stream()
                        .map(this::toItemDto)
                        .collect(Collectors.toList()))
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    private ShippingAddressDto toShippingDto(ShippingAddress address) {
        if (address == null) return null;
        
        return ShippingAddressDto.builder()
                .name(address.getName())
                .phone(address.getPhone())
                .line1(address.getLine1())
                .line2(address.getLine2())
                .city(address.getCity())
                .region(address.getRegion())
                .postalCode(address.getPostalCode())
                .country(address.getCountry())
                .build();
    }

    private OrderItemDto toItemDto(OrderItem item) {
        return OrderItemDto.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getNameFr())
                .productSku(item.getProduct().getSku())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .totalPrice(item.getTotalPrice())
                .build();
    }
}
