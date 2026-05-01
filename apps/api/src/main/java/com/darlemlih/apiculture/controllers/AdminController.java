package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.admin.*;
import com.darlemlih.apiculture.dto.product.ProductDto;
import com.darlemlih.apiculture.dto.product.ProductImageUploadResponse;
import com.darlemlih.apiculture.entities.User;
import com.darlemlih.apiculture.entities.enums.UserRole;
import com.darlemlih.apiculture.repositories.UserRepository;
import com.darlemlih.apiculture.services.AdminService;
import com.darlemlih.apiculture.services.ProductService;
import com.darlemlih.apiculture.config.properties.UploadProperties;
import com.darlemlih.apiculture.services.storage.FileStorageService;
import com.darlemlih.apiculture.services.storage.FileUploadRequest;
import com.darlemlih.apiculture.services.storage.FileUploadResult;
import com.darlemlih.apiculture.services.storage.StorageException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;
    private final UploadProperties uploadProperties;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardDto> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @PostMapping("/seed")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> seedDatabase() {
        adminService.seedDatabase();
        return ResponseEntity.ok("Database seeded successfully");
    }
    
    @PostMapping("/reset-passwords")
    public ResponseEntity<Map<String, Object>> resetPasswords() {
        Map<String, Object> result = new HashMap<>();
        
        // Reset admin password
        userRepository.findByEmail("admin@darlemlih.ma").ifPresent(user -> {
            user.setPassword(passwordEncoder.encode("Admin!234"));
            userRepository.save(user);
            result.put("admin", "Password reset to Admin!234");
        });
        
        // Reset customer password
        userRepository.findByEmail("customer@darlemlih.ma").ifPresent(user -> {
            user.setPassword(passwordEncoder.encode("Customer!234"));
            userRepository.save(user);
            result.put("customer", "Password reset to Customer!234");
        });
        
        // Create users if they don't exist
        if (!userRepository.existsByEmail("admin@darlemlih.ma")) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@darlemlih.ma")
                    .password(passwordEncoder.encode("Admin!234"))
                    .phone("+212600000001")
                    .role(UserRole.ADMIN)
                    .enabled(true)
                    .emailVerified(true)
                    .build();
            userRepository.save(admin);
            result.put("admin", "Admin user created with password Admin!234");
        }
        
        if (!userRepository.existsByEmail("customer@darlemlih.ma")) {
            User customer = User.builder()
                    .name("Customer User")
                    .email("customer@darlemlih.ma")
                    .password(passwordEncoder.encode("Customer!234"))
                    .phone("+212600000002")
                    .role(UserRole.CUSTOMER)
                    .enabled(true)
                    .emailVerified(true)
                    .build();
            userRepository.save(customer);
            result.put("customer", "Customer user created with password Customer!234");
        }
        
        result.put("message", "Passwords reset successfully");
        return ResponseEntity.ok(result);
    }

    // Basic product management for MVP
    @GetMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ProductDto>> listProducts(Pageable pageable) {
        return ResponseEntity.ok(productService.listAll(pageable));
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto dto) {
        return ResponseEntity.ok(productService.create(dto));
    }

    @PutMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/products/{id}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductImageUploadResponse> uploadImages(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files) {
        if (files == null || files.length == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No files provided for upload");
        }
        if (files.length > uploadProperties.getMaxFiles()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Too many files provided. Maximum allowed is " + uploadProperties.getMaxFiles());
        }

        ProductDto product = productService.getById(id);
        List<FileUploadResult> storedFiles = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                if (file == null || file.isEmpty()) {
                    continue;
                }
                validateFile(file);

                FileUploadRequest request = FileUploadRequest.builder()
                        .originalFilename(file.getOriginalFilename())
                        .directory("products/" + id)
                        .contentType(file.getContentType())
                        .bytes(file.getBytes())
                        .build();

                storedFiles.add(fileStorageService.store(request));
            }
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (IOException | StorageException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Upload failed", e);
        }

        if (!storedFiles.isEmpty()) {
            if (product.getImages() == null) {
                product.setImages(new ArrayList<>());
            }
            product.getImages().addAll(
                    storedFiles.stream().map(FileUploadResult::getUrl).collect(Collectors.toList()));
            product = productService.update(id, product);
        }

        ProductImageUploadResponse response = ProductImageUploadResponse.builder()
                .success(true)
                .message(storedFiles.isEmpty()
                        ? "No files uploaded"
                        : "Images uploaded successfully")
                .product(product)
                .uploads(ProductImageUploadResponse.mapResults(storedFiles))
                .build();

        return ResponseEntity.ok(response);
    }

    private void validateFile(MultipartFile file) {
        long maxSize = uploadProperties.getMaxSize();
        if (file.getSize() > maxSize) {
            throw new IllegalArgumentException("File '" + file.getOriginalFilename() + "' exceeds max size of " + maxSize + " bytes");
        }

        String contentType = file.getContentType();
        Set<String> allowedContentTypes = uploadProperties.getAllowedContentTypes().stream()
                .filter(StringUtils::hasText)
                .map(String::trim)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());
        if (contentType == null || !allowedContentTypes.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("File '" + file.getOriginalFilename() + "' has unsupported content type " + contentType);
        }

        String extension = extractExtension(file.getOriginalFilename());
        if (extension == null || uploadProperties.getAllowedExtensions().stream()
                .filter(StringUtils::hasText)
                .map(String::trim)
                .map(String::toLowerCase)
                .noneMatch(ext -> ext.equals(extension))) {
            throw new IllegalArgumentException("File '" + file.getOriginalFilename() + "' has unsupported extension");
        }
    }

    private String extractExtension(String filename) {
        if (filename == null) {
            return null;
        }
        int idx = filename.lastIndexOf('.');
        if (idx <= 0 || idx == filename.length() - 1) {
            return null;
        }
        return filename.substring(idx + 1).trim().toLowerCase();
    }
}
