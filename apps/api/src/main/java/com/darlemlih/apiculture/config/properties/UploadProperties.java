package com.darlemlih.apiculture.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "app.uploads")
@Getter
@Setter
public class UploadProperties {

    /**
     * Root directory where uploaded files are persisted.
     */
    private String path = "./uploads";

    /**
     * Public HTTP base path that will be used to expose uploaded assets.
     * Example: /uploads
     */
    private String publicBaseUrl = "/uploads";

    /**
     * Maximum file size in bytes.
     */
    private long maxSize = 10 * 1024 * 1024;

    /**
     * Maximum number of files accepted per multi-upload request.
     */
    private int maxFiles = 6;

    /**
     * Allowed file extensions (lower-cased, without the leading dot).
     */
    private List<String> allowedExtensions = List.of("jpg", "jpeg", "png", "gif", "webp");

    /**
     * Allowed MIME types for uploads.
     */
    private List<String> allowedContentTypes = List.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
    );
}
