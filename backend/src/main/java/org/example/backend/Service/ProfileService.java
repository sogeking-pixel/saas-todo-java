package org.example.backend.Service;

import lombok.RequiredArgsConstructor;
import org.example.backend.Dto.Response.UserResponse;
import org.example.backend.Mapper.UserMapper;
import org.example.backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserResponse getMe(String username){
        var user = userRepository.findByUsername(username).orElseThrow();
        return userMapper.toResponse(user);
    }

}
