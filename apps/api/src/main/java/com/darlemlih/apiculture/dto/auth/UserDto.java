package com.darlemlih.apiculture.dto.auth;

import com.darlemlih.apiculture.entities.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private UserRole role;
    private Boolean emailVerified;
}
