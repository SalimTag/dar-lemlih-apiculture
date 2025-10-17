package com.darlemlih.apiculture.services.storage;

import com.darlemlih.apiculture.config.properties.UploadProperties;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RequiredArgsConstructor
public class LocalFileStorageService implements FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(LocalFileStorageService.class);

    private final UploadProperties uploadProperties;

    @Override
    public FileUploadResult store(FileUploadRequest request) {
        try {
            Path root = Paths.get(uploadProperties.getPath()).toAbsolutePath().normalize();
            Path targetDirectory = resolveDirectory(root, request.getDirectory());
            Files.createDirectories(targetDirectory);

            String extension = resolveExtension(request);
            String generatedName = UUID.randomUUID().toString().replace("-", "") + extension;
            Path targetFile = targetDirectory.resolve(generatedName);

            Files.write(targetFile, request.getBytes());

            String relativeKey = root.relativize(targetFile).toString().replace("\\", "/");
            String publicUrl = buildPublicUrl(relativeKey);

            log.debug("Stored file locally at {} (public URL: {})", targetFile, publicUrl);

            return FileUploadResult.builder()
                    .key(relativeKey)
                    .url(publicUrl)
                    .contentType(request.getContentType())
                    .size(request.getSize())
                    .build();
        } catch (IOException e) {
            throw new StorageException("Unable to store file locally", e);
        }
    }

    @Override
    public void delete(String key) {
        if (!StringUtils.hasText(key)) {
            return;
        }
        try {
            Path root = Paths.get(uploadProperties.getPath()).toAbsolutePath().normalize();
            Path targetFile = root.resolve(key).normalize();
            if (!targetFile.startsWith(root)) {
                throw new StorageException("Attempted to delete file outside of the uploads directory");
            }
            Files.deleteIfExists(targetFile);
        } catch (IOException e) {
            throw new StorageException("Unable to delete file '" + key + "'", e);
        }
    }

    private Path resolveDirectory(Path root, String directory) {
        if (!StringUtils.hasText(directory)) {
            return root;
        }
        Path resolved = root.resolve(directory).normalize();
        if (!resolved.startsWith(root)) {
            throw new StorageException("Invalid directory for upload: " + directory);
        }
        return resolved;
    }

    private String resolveExtension(FileUploadRequest request) {
        String filename = request.getOriginalFilename();
        if (StringUtils.hasText(filename) && filename.contains(".")) {
            String ext = filename.substring(filename.lastIndexOf("."));
            if (StringUtils.hasText(ext)) {
                return ext.toLowerCase();
            }
        }
        // Fallback to MIME type if provided
        String contentType = request.getContentType();
        if (StringUtils.hasText(contentType)) {
            return switch (contentType) {
                case "image/png" -> ".png";
                case "image/webp" -> ".webp";
                case "image/gif" -> ".gif";
                case "image/jpeg" -> ".jpg";
                default -> ".bin";
            };
        }
        return ".bin";
    }

    private String buildPublicUrl(String relativeKey) {
        String base = uploadProperties.getPublicBaseUrl();
        if (!StringUtils.hasText(base)) {
            base = "/uploads";
        }
        String normalizedBase = base.endsWith("/") ? base.substring(0, base.length() - 1) : base;
        return normalizedBase + "/" + relativeKey.replace("\\", "/");
    }
}
