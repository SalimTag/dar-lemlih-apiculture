package com.darlemlih.apiculture.services;

import com.darlemlih.apiculture.dto.auth.*;
import com.darlemlih.apiculture.entities.User;
import com.darlemlih.apiculture.entities.enums.UserRole;
import com.darlemlih.apiculture.repositories.UserRepository;
import com.darlemlih.apiculture.exceptions.ConflictException;
import com.darlemlih.apiculture.exceptions.NotFoundException;
import com.darlemlih.apiculture.exceptions.UnauthorizedException;
import com.darlemlih.apiculture.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("EMAIL_EXISTS", "Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(UserRole.CUSTOMER)
                .enabled(true)
                .emailVerified(false)
                .build();

        user = userRepository.save(user);

        String accessToken = jwtUtils.generateAccessToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(user);
        
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        return buildAuthResponse(user, accessToken, refreshToken);
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new UnauthorizedException("INVALID_CREDENTIALS", "Invalid email or password");
        }

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));

        String accessToken = jwtUtils.generateAccessToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(user);
        
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        return buildAuthResponse(user, accessToken, refreshToken);
    }

    public AuthResponse refresh(String refreshToken) {
    User user = userRepository.findByRefreshToken(refreshToken)
        .orElseThrow(() -> new UnauthorizedException("INVALID_REFRESH_TOKEN", "Invalid refresh token"));

        String newAccessToken = jwtUtils.generateAccessToken(user);
        String newRefreshToken = jwtUtils.generateRefreshToken(user);
        
        user.setRefreshToken(newRefreshToken);
        userRepository.save(user);

        return buildAuthResponse(user, newAccessToken, newRefreshToken);
    }

    @Transactional
    public void forgotPassword(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));

        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        user.setResetPasswordTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user.getEmail(), token);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
    User user = userRepository.findByResetPasswordToken(token)
        .orElseThrow(() -> new UnauthorizedException("INVALID_RESET_TOKEN", "Invalid token"));

        if (user.getResetPasswordTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("RESET_TOKEN_EXPIRED", "Token expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiry(null);
        userRepository.save(user);
    }

    private AuthResponse buildAuthResponse(User user, String accessToken, String refreshToken) {
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .emailVerified(user.getEmailVerified())
                .build();

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(900L) // 15 minutes
                .user(userDto)
                .build();
    }
}
