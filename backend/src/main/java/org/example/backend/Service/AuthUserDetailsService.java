package org.example.backend.Service;

import lombok.RequiredArgsConstructor;
import org.example.backend.Dto.Request.UserCreateRequest;
import org.example.backend.Entity.AuthUser;
import org.example.backend.Mapper.UserMapper;
import org.example.backend.Repository.UserRepository;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserMapper userMapper;

    @NullMarked
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new AuthUser(user);
    }

    public void createUser(UserCreateRequest userCreateRequest) {
        var user = userMapper.toEntity(userCreateRequest);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

}