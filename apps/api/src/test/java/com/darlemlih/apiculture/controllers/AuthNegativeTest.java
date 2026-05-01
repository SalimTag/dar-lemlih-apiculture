package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.auth.LoginRequest;
import com.darlemlih.apiculture.dto.auth.RegisterRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ActiveProfiles;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("h2")
class AuthNegativeTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("Refresh with invalid token returns 401 ApiError")
    void invalidRefreshToken() throws Exception {
        mockMvc.perform(post("/api/auth/refresh")
                        .queryParam("refreshToken", "invalid-token"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("INVALID_REFRESH_TOKEN"))
                .andExpect(jsonPath("$.error").value("Unauthorized"));
    }

    @Test
    @DisplayName("Register validation errors return structured ApiError")
    void registerValidationErrors() throws Exception {
        RegisterRequest reg = new RegisterRequest(); // empty -> triggers validation
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reg)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.fields.name").exists())
                .andExpect(jsonPath("$.details.fields.email").exists())
                .andExpect(jsonPath("$.details.fields.password").exists());
    }

    @Test
    @DisplayName("Login invalid credentials returns 401 ApiError")
    void loginInvalidCredentials() throws Exception {
        LoginRequest login = new LoginRequest();
        login.setEmail("nouser@example.com");
        login.setPassword("wrong");
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("INVALID_CREDENTIALS"));
    }
}
