package com.darlemlih.apiculture.exceptions;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
    private final LocalDateTime timestamp;
    private final int status;
    private final String error;
    private final String code;
    private final String message;
    @Singular("detail")
    private final Map<String, Object> details;
    private final String traceId;
}
