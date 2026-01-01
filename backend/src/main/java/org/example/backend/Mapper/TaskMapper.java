package org.example.backend.Mapper;

import org.example.backend.Dto.Request.TaskRequest;
import org.example.backend.Dto.Response.TaskResponse;
import org.example.backend.Entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    Task toEntity(TaskRequest request);

    TaskResponse toResponse(Task entity);

    @Mapping(target = "userId", source = "user.id")
    TaskResponse toResponseWithUserId(Task entity);
}

