package org.example.backend.Repository;

import org.example.backend.Entity.RefreshToken;
import org.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findById(long id);
    Optional<RefreshToken> findByToken(String token);
    List<RefreshToken> findByUser(User use);

}
