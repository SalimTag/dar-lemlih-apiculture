package com.darlemlih.apiculture.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address extends BaseEntity {
    
    @Column(nullable = false)
    private String line1;
    
    private String line2;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String region;
    
    @Column(nullable = false)
    private String postalCode;
    
    @Column(nullable = false)
    private String country = "Morocco";
    
    @Column(nullable = false)
    private Boolean isDefault = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
