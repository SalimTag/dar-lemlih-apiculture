package com.darlemlih.apiculture.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class ApplicationHealthIndicator implements HealthIndicator {
    
    @Override
    public Health health() {
        // For now, always return UP
        // In production, you might want to check database connectivity, etc.
        return Health.up()
                .withDetail("service", "dar-lemlih-api")
                .withDetail("status", "healthy")
                .build();
    }
}
