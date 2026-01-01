package org.example.backend.Service;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.example.backend.Entity.User;
import org.example.backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> findAll(
            @Nullable String first_name,
            @Nullable String last_name
    ) {
        if (first_name != null && last_name != null) {
            return userRepository.findByFirstNameAndLastName(first_name, last_name);
        }

        if (first_name != null) {
            return userRepository.findByFirstName(first_name);
        }

        if (last_name != null) {
            return userRepository.findByLastName(last_name);
        }

        return userRepository.findAll();
    }

    public Optional<User> findById(long id)
    {
        return userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        if (
            userRepository.existsUserByDni(user.getDni()) ||
            userRepository.existsUserByEmail(user.getEmail()) ||
            userRepository.existsUserByUsername(user.getUsername())
        ) {
            throw new RuntimeException("Username already exists");
        }
        return userRepository.save(user);
    }

}
