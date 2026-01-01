package org.example.backend.Dto.Response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private long id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String fullName;
    private String dni;
}
