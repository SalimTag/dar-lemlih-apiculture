package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.services.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact form submission")
public class ContactController {

    private final EmailService emailService;

    @Data
    public static class ContactRequest {
        @NotBlank
        private String name;

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String subject;

        @NotBlank
        private String message;
    }

    @PostMapping
    @Operation(summary = "Submit contact form", description = "Sends the contact message to the configured admin email address")
    public ResponseEntity<String> contact(@Valid @RequestBody ContactRequest request) {
        emailService.sendContactFormEmail(request.getName(), request.getEmail(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok("Message received");
    }
}
