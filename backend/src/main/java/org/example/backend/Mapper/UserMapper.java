package org.example.backend.Mapper;
import org.example.backend.Dto.Request.UserCreateRequest;
import org.example.backend.Dto.Response.UserResponse;
import org.example.backend.Entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserCreateRequest request);

    @Mapping(target = "fullName", expression = "java(entity.getFirstName() + \" \" + entity.getLastName())")
    UserResponse toResponse(User entity);
}
