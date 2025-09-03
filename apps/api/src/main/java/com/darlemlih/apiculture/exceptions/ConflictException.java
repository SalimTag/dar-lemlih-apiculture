package com.darlemlih.apiculture.exceptions;

import org.springframework.http.HttpStatus;

public class ConflictException extends ApiException {
    public ConflictException(String code, String message) {
        super(HttpStatus.CONFLICT, code, message);
    }
}
