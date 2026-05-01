package com.darlemlih.apiculture.dto.product;

import com.darlemlih.apiculture.services.storage.FileUploadResult;
import lombok.Builder;
import lombok.Singular;
import lombok.Value;

import java.util.List;
import java.util.stream.Collectors;

@Value
@Builder
public class ProductImageUploadResponse {
    boolean success;
    String message;
    ProductDto product;
    @Singular
    List<FileUploadResultDto> uploads;

    public static List<FileUploadResultDto> mapResults(List<FileUploadResult> results) {
        return results.stream()
                .map(result -> FileUploadResultDto.builder()
                        .key(result.getKey())
                        .url(result.getUrl())
                        .contentType(result.getContentType())
                        .size(result.getSize())
                        .build())
                .collect(Collectors.toList());
    }
}
