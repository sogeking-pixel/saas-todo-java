package org.example.backend.Service;

import lombok.RequiredArgsConstructor;
import org.example.backend.Entity.RefreshToken;
import org.example.backend.Entity.User;
import org.example.backend.Repository.RefreshTokenRepository;
import org.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    @Value("${security.jwt-refresh.expiration-time}")
    private long jwtRefreshExpiration;

    public RefreshToken createRefreshToken(User user, String tokeString){

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(tokeString)
                .revoked(false)
                .expiryDate(Instant.now().plusMillis(jwtRefreshExpiration))
                .build();
        return refreshTokenRepository.save(refreshToken);

    }

    public Optional<RefreshToken> findByTokenString(String tokenString){
        return refreshTokenRepository.findByToken(tokenString);
    }
}
