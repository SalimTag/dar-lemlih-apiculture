package com.darlemlih.apiculture.config;

import com.darlemlih.apiculture.config.properties.AwsProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

@Configuration
@RequiredArgsConstructor
public class AwsConfig {

    private final AwsProperties awsProperties;

    @Bean
    @ConditionalOnProperty(prefix = "aws.s3", name = "enabled", havingValue = "true")
    public S3Client s3Client() {
        return S3Client.builder()
                .endpointOverride(URI.create(awsProperties.getEndpoint()))
                .region(Region.of(awsProperties.getRegion()))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(awsProperties.getAccessKey(), awsProperties.getSecretKey())))
                .serviceConfiguration(S3Configuration.builder().pathStyleAccessEnabled(true).build())
                .build();
    }
}
