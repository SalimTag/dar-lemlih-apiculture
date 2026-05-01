package com.darlemlih.apiculture.config;

import com.darlemlih.apiculture.config.properties.AwsProperties;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.BucketAlreadyOwnedByYouException;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.NoSuchBucketException;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "aws.s3", name = "enabled", havingValue = "true")
@ConditionalOnBean(S3Client.class)
public class S3Initializer {
    private static final Logger log = LoggerFactory.getLogger(S3Initializer.class);

    private final S3Client s3Client;
    private final AwsProperties awsProperties;

    @PostConstruct
    public void init() {
        if (!awsProperties.getS3().isEnabled()) {
            return;
        }

        String bucket = awsProperties.getS3().getBucket();
        try {
            s3Client.headBucket(HeadBucketRequest.builder().bucket(bucket).build());
            log.info("S3 bucket '{}' already exists", bucket);
        } catch (NoSuchBucketException e) {
            try {
                s3Client.createBucket(CreateBucketRequest.builder().bucket(bucket).build());
                log.info("Created S3 bucket '{}'", bucket);
            } catch (BucketAlreadyOwnedByYouException ex) {
                log.info("Bucket '{}' already owned", bucket);
            }
        } catch (Exception e) {
            log.warn("Could not verify or create S3 bucket '{}': {}", bucket, e.getMessage());
        }
    }
}
