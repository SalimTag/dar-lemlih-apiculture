package com.darlemlih.apiculture.services.storage;

public interface FileStorageService {

    /**
     * Persist the provided file and return the resulting storage metadata.
     *
     * @param request details about the file to store
     * @return the persisted file metadata (key + public URL)
     * @throws StorageException when the file cannot be stored
     */
    FileUploadResult store(FileUploadRequest request);

    /**
     * Optional hook to delete files. Default implementation is a no-op to keep
     * backwards compatibility where deletion is not required yet.
     *
     * @param key backend identifier to remove
     */
    default void delete(String key) {
        // no-op
    }
}
