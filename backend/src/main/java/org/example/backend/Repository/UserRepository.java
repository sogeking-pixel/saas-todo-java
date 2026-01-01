package org.example.backend.Repository;

import org.example.backend.Entity.Task;
import org.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(long id);
    Optional<User>  findByUsername(String username);
    Optional<User>  findByEmail(String email);
    Optional<User>  findByDni(String dni);
    List<User> findByFirstName(String firstName);
    List<User> findByLastName(String lastName);
    List<User> findByFirstNameAndLastName(String firstName, String lastName);
    boolean existsUserByUsername(String username);
    boolean existsUserByEmail(String email);
    boolean existsUserByDni(String dni);
}
