package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.request.CreatePaymentRequest;
import com.darlemlih.apiculture.dto.response.PaymentSessionResponse;
import com.darlemlih.apiculture.dto.response.RefundResponse;
import com.darlemlih.apiculture.services.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "Payment processing operations")
public class PaymentController {

    private final PaymentService paymentService;

    @Operation(
        summary = "Create payment session",
        description = "Creates a payment session for an order",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/create-session")
    public ResponseEntity<PaymentSessionResponse> createPaymentSession(
            @Valid @RequestBody CreatePaymentRequest request) {
        PaymentSessionResponse response = paymentService.createPaymentSession(request);
        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Get payment status",
        description = "Gets the current status of a payment session",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/status/{sessionId}")
    public ResponseEntity<PaymentSessionResponse> getPaymentStatus(@PathVariable String sessionId) {
        PaymentSessionResponse response = paymentService.getPaymentStatus(sessionId);
        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Process refund",
        description = "Processes a refund for a payment",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/refund/{paymentIntentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RefundResponse> processRefund(
            @PathVariable String paymentIntentId,
            @RequestParam(required = false) String amount) {
        RefundResponse response = paymentService.processRefund(paymentIntentId, amount);
        return ResponseEntity.ok(response);
    }
}
