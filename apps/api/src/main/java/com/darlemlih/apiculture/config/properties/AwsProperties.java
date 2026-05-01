package com.darlemlih.apiculture.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aws")
@Getter
@Setter
public class AwsProperties {
    /**
     * Endpoint override used for AWS SDK calls (LocalStack in dev by default).
     */
    private String endpoint = "http://localhost:4566";

    /**
     * Optional public endpoint that can be used to build shareable URLs.
     */
    private String publicEndpoint = "http://localhost:4566";

    /**
     * AWS region.
     */
    private String region = "us-east-1";

    /**
     * Access key used for AWS-compatible services.
     */
    private String accessKey = "test";

    /**
     * Secret key used for AWS-compatible services.
     */
    private String secretKey = "test";

    private final S3Properties s3 = new S3Properties();

    @Getter
    @Setter
    public static class S3Properties {
        /**
         * Flag to enable S3-backed storage.
         */
        private boolean enabled = false;

        /**
         * Bucket name that will receive uploaded assets.
         */
        private String bucket = "media";
    }
}
