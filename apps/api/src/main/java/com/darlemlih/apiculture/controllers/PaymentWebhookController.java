package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.services.PaymentWebhookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentWebhookController {

    private final PaymentWebhookService webhookService;

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestHeader(value = "Stripe-Signature", required = false) String signature,
            @RequestBody String payload) {
        webhookService.processWebhook(signature, payload);
        return ResponseEntity.ok("Webhook processed");
    }
}
