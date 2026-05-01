package com.darlemlih.apiculture.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static class Counter { long windowStart; int count; }
    private final Map<String, Counter> buckets = new ConcurrentHashMap<>();
    private static final long WINDOW_MS = 60_000; // 1 minute
    private static final int MAX_AUTH = 20; // per minute
    private static final int MAX_CART = 60; // per minute

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        boolean limited = path.startsWith("/api/auth/") || path.startsWith("/api/cart/");
        if (!limited) {
            filterChain.doFilter(request, response);
            return;
        }
        String key = (request.getRemoteAddr() == null ? "unknown" : request.getRemoteAddr()) + ":" + (path.startsWith("/api/auth/") ? "auth" : "cart");
        long now = Instant.now().toEpochMilli();
        Counter c = buckets.computeIfAbsent(key, k -> { Counter x = new Counter(); x.windowStart = now; x.count = 0; return x; });
        synchronized (c) {
            if (now - c.windowStart > WINDOW_MS) { c.windowStart = now; c.count = 0; }
            c.count++;
            int limit = key.endsWith("auth") ? MAX_AUTH : MAX_CART;
            if (c.count > limit) {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"rate_limited\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}

