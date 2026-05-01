package com.darlemlih.apiculture.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddress {
    
    @Column(name = "shipping_name")
    private String name;
    
    @Column(name = "shipping_phone")
    private String phone;
    
    @Column(name = "shipping_line1")
    private String line1;
    
    @Column(name = "shipping_line2")
    private String line2;
    
    @Column(name = "shipping_city")
    private String city;
    
    @Column(name = "shipping_region")
    private String region;
    
    @Column(name = "shipping_postal_code")
    private String postalCode;
    
    @Column(name = "shipping_country")
    private String country;
}
