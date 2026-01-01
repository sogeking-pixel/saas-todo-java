package org.example.backend.Dto.Request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String dni;
}
