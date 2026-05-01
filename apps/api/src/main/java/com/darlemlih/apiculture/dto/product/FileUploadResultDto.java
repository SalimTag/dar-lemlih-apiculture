package com.darlemlih.apiculture.dto.product;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class FileUploadResultDto {
    String key;
    String url;
    String contentType;
    long size;
}
