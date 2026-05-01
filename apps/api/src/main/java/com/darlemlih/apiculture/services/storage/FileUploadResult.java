package com.darlemlih.apiculture.services.storage;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileUploadResult {
    /**
     * Storage backend identifier (e.g. relative path for local storage or S3 object key).
     */
    private final String key;

    /**
     * Publicly accessible URL for the stored asset.
     */
    private final String url;

    /**
     * Stored content type.
     */
    private final String contentType;

    /**
     * Stored file size in bytes.
     */
    private final long size;
}
