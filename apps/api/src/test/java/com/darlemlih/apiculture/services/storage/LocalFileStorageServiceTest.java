package com.darlemlih.apiculture.services.storage;

import com.darlemlih.apiculture.config.properties.UploadProperties;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class LocalFileStorageServiceTest {

    @TempDir
    Path tempDir;

    @Test
    void storeShouldPersistFileAndReturnPublicUrl() throws Exception {
        UploadProperties properties = new UploadProperties();
        properties.setPath(tempDir.toString());
        properties.setPublicBaseUrl("/uploads");

        LocalFileStorageService service = new LocalFileStorageService(properties);

        FileUploadRequest request = FileUploadRequest.builder()
                .originalFilename("sample.png")
                .directory("products")
                .contentType("image/png")
                .bytes("test-data".getBytes(StandardCharsets.UTF_8))
                .build();

        FileUploadResult result = service.store(request);

        assertThat(result.getKey()).startsWith("products/");
        assertThat(result.getUrl()).isEqualTo("/uploads/" + result.getKey());
        assertThat(result.getContentType()).isEqualTo("image/png");
        assertThat(result.getSize()).isEqualTo(request.getSize());

        Path storedFile = tempDir.resolve(result.getKey());
        assertThat(Files.exists(storedFile)).isTrue();
        String content = Files.readString(storedFile, StandardCharsets.UTF_8);
        assertThat(content).isEqualTo("test-data");
    }

    @Test
    void storeShouldRejectDirectoryTraversal() {
        UploadProperties properties = new UploadProperties();
        properties.setPath(tempDir.toString());

        LocalFileStorageService service = new LocalFileStorageService(properties);

        FileUploadRequest request = FileUploadRequest.builder()
                .originalFilename("evil.png")
                .directory("../etc")
                .contentType("image/png")
                .bytes(new byte[]{1, 2, 3})
                .build();

        assertThatThrownBy(() -> service.store(request))
                .isInstanceOf(StorageException.class)
                .hasMessageContaining("Invalid directory");
    }
}
