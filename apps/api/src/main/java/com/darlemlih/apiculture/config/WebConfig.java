package com.darlemlih.apiculture.config;

import com.darlemlih.apiculture.config.properties.UploadProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final UploadProperties uploadProperties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadDirectory = Paths.get(uploadProperties.getPath()).toAbsolutePath().normalize();
        String location = uploadDirectory.toUri().toString();

        String pattern = buildHandlerPattern(uploadProperties.getPublicBaseUrl());

        registry.addResourceHandler(pattern)
                .addResourceLocations(location)
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS).cachePublic().immutable());
    }

    private String buildHandlerPattern(String basePath) {
        String pattern = StringUtils.hasText(basePath) ? basePath : "/uploads";
        if (!pattern.startsWith("/")) {
            pattern = "/" + pattern;
        }
        if (!pattern.endsWith("/**")) {
            if (pattern.endsWith("/")) {
                pattern = pattern + "**";
            } else {
                pattern = pattern + "/**";
            }
        }
        return pattern;
    }
}
