package com.darlemlih.apiculture.services.storage;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileUploadRequest {
    /**
     * Original filename supplied by the client (may be used for logs or extension detection).
     */
    private final String originalFilename;

    /**
     * Optional logical folder/prefix to organise assets (e.g. "products").
     */
    private final String directory;

    /**
     * MIME type sent by the client.
     */
    private final String contentType;

    /**
     * Raw file bytes.
     */
    private final byte[] bytes;

    /**
     * Size in bytes (convenience access, derived from {@link #bytes}).
     */
    public long getSize() {
        return bytes != null ? bytes.length : 0;
    }
}
