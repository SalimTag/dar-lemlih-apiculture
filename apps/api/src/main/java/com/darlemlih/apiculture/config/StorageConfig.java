package com.darlemlih.apiculture.config;

import com.darlemlih.apiculture.config.properties.AwsProperties;
import com.darlemlih.apiculture.config.properties.UploadProperties;
import com.darlemlih.apiculture.services.storage.FileStorageService;
import com.darlemlih.apiculture.services.storage.LocalFileStorageService;
import com.darlemlih.apiculture.services.storage.S3FileStorageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@RequiredArgsConstructor
public class StorageConfig {

    private static final Logger log = LoggerFactory.getLogger(StorageConfig.class);

    private final UploadProperties uploadProperties;
    private final AwsProperties awsProperties;
    private final ObjectProvider<S3Client> s3ClientProvider;

    @Bean
    public FileStorageService fileStorageService() {
        S3Client s3Client = s3ClientProvider.getIfAvailable();
        boolean s3Enabled = awsProperties.getS3().isEnabled() && s3Client != null;

        if (s3Enabled) {
            log.info("Using S3-compatible storage backend at {} (bucket: {})",
                    awsProperties.getEndpoint(), awsProperties.getS3().getBucket());
            return new S3FileStorageService(s3Client, awsProperties);
        }

        String uploadPath = StringUtils.hasText(uploadProperties.getPath())
                ? uploadProperties.getPath()
                : "./uploads";
        log.info("Using local file storage at {}", uploadPath);
        return new LocalFileStorageService(uploadProperties);
    }
}
