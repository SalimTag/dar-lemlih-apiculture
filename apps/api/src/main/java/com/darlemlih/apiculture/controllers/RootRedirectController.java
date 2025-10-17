package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.config.properties.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RootRedirectController {

    private final AppProperties appProperties;

    @GetMapping("/")
    public Map<String, String> root() {
        return Map.of(
            "service", "Dar Lemlih API",
            "status", "OK",
            "webBaseUrl", appProperties.getWebBaseUrl() != null ? appProperties.getWebBaseUrl() : "Not configured",
            "docs", "/swagger-ui.html"
        );
    }
}
