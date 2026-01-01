package org.example.backend.Service;

import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.backend.Entity.AuthUser;
import org.example.backend.Entity.RefreshToken;
import org.example.backend.Dto.Request.RefreshTokenRequest;
import org.example.backend.Dto.Response.AuthenticationResponse;
import org.example.backend.Dto.Request.UserRequest;
import org.example.backend.Entity.User;
import org.example.backend.Enums.TypeToken;
import org.example.backend.Exceptions.InvalidTokenException;
import org.example.backend.Repository.RefreshTokenRepository;
import org.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final BlackListService blackListService;
    @Value("${security.jwt-access.expiration-time}")
    private long jwtAccessExpiration;

    public AuthenticationResponse login(UserRequest userRequest){
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword())
        );

        if (!authentication.isAuthenticated()) {
            throw new UsernameNotFoundException("Invalid user request!");
        }

        var username = userRequest.getUsername();
        var user = userRepository.findByUsername(username).orElseThrow();

        return this.createAccessAndRefresh(user);
    }

    @Transactional
    public void logout(RefreshTokenRequest refreshTokenRequest, AuthUser userAuth, String jwtAccess)
    {

        var jtiAccess = jwtService.extractClaim(jwtAccess, Claims::getId);
        blackListService.blacklistToken(jtiAccess, jwtAccessExpiration );

        var tokenString = refreshTokenRequest.getRefreshToken();

        if(!jwtService.validateTokenAndTypeToken(tokenString, userAuth, TypeToken.REFRESH_TOKEN)) {
            throw new InvalidTokenException();
        }

        var refreshToken = refreshTokenService.findByTokenString(tokenString).orElseThrow();

        if(!refreshToken.isRevoked()){
            refreshToken.setRevoked(true);
            refreshTokenRepository.save(refreshToken);
        }


    }


    public AuthenticationResponse getNewToken(RefreshTokenRequest refreshTokenRequest){

        var tokenString = refreshTokenRequest.getRefreshToken();

        if(!jwtService.validateTokenAndTypeToken(tokenString, TypeToken.REFRESH_TOKEN)){
            throw new InvalidTokenException();
        }

        var refreshToken = refreshTokenService.findByTokenString(tokenString).orElseThrow();

        if(refreshToken.isRevoked()){
            revokeAllUserTokens(refreshToken.getUser());
        }

        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);

        var user = refreshToken.getUser();

        return this.createAccessAndRefresh(user);

    }

    private AuthenticationResponse createAccessAndRefresh(User user){

        var jwtAccess = jwtService.generateToken(user, TypeToken.ACCESS_TOKEN);
        var jwtRefresh = jwtService.generateToken(user, TypeToken.REFRESH_TOKEN);

        refreshTokenService.createRefreshToken(user, jwtRefresh);

        return AuthenticationResponse.builder()
                .accessToken(jwtAccess)
                .refreshToken(jwtRefresh)
                .build();
    }

    private void revokeAllUserTokens(User user) {
        List<RefreshToken> allTokens = refreshTokenRepository.findByUser(user);
        allTokens.forEach(t -> {
            t.setRevoked(true);
            t.setExpired(true);
        });
        refreshTokenRepository.saveAll(allTokens);
    }



}
