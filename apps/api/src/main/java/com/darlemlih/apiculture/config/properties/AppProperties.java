package com.darlemlih.apiculture.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "app")
@Getter
@Setter
public class AppProperties {
    private String baseUrl;
    private String webBaseUrl;
    private Cors cors = new Cors();

    @Getter
    @Setter
    public static class Cors {
        private List<String> allowedOrigins;
        private String allowedMethods;
        private String allowedHeaders;
        private Boolean allowCredentials;
        private Long maxAge;
    }
}
