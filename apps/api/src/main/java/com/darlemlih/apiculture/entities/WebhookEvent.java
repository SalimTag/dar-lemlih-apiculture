package com.darlemlih.apiculture.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "webhook_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebhookEvent extends BaseEntity {
    
    @Column(nullable = false)
    private String provider;
    
    @Column(nullable = false, unique = true)
    private String eventId;
    
    @Column(nullable = false)
    private String eventType;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String payload;
    
    private String signature;
    
    @Column(nullable = false)
    private Boolean processed = false;
    
    private LocalDateTime processedAt;
    
    @Column(columnDefinition = "TEXT")
    private String error;
}
