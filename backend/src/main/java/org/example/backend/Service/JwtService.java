package org.example.backend.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.example.backend.Entity.User;
import org.example.backend.Enums.TypeToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Component
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt-access.expiration-time}")
    private long jwtAccessExpiration;
    @Value("${security.jwt-refresh.expiration-time}")
    private long jwtRefreshExpiration;


    public String generateToken(User user, TypeToken typeToken) {
        Map<String, Object> claims = new HashMap<>();

        if(typeToken == TypeToken.ACCESS_TOKEN){
            return createAccessToken(claims, user);
        }

        if(typeToken == TypeToken.REFRESH_TOKEN){
            return createRefreshToken(claims, user);
        }

        return null;
    }

    private String createAccessToken(Map<String, Object> claims, User user ){
        return Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .id(UUID.randomUUID().toString())
                .issuedAt(new Date())
                .expiration(new Date( System.currentTimeMillis() +jwtAccessExpiration))
                .claim("type", TypeToken.ACCESS_TOKEN.getName())
                .claim("role","ADMIN")
                .signWith(getSignKey())
                .compact();
    }


    private String createRefreshToken(Map<String, Object> claims, User user) {
        return Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .id(UUID.randomUUID().toString())
                .issuedAt(new Date())
                .expiration(new Date( System.currentTimeMillis() + jwtRefreshExpiration))
                .claim("type", TypeToken.REFRESH_TOKEN.getName())
                .claim("role","ADMIN")
                .signWith(getSignKey())
                .compact();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractTypeToken(String token){
        return extractClaim(token, claims -> claims.get("type", String.class) );
    }

    public String extractRol(String token){
        return extractClaim(token, claims -> claims.get("rol", String.class));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())
                && !this.isTokenExpired(token))  ;
    }

    public Boolean validateToken(String token){
        return !this.isTokenExpired(token);
    }

    public Boolean validateTokenAndTypeToken(String token, UserDetails userDetails, TypeToken typeToken){
        var nameTypeToken = typeToken.getName();
        return this.validateToken(token, userDetails) && nameTypeToken.equals(extractTypeToken(token));
    }

    public Boolean validateTokenAndTypeToken(String token, TypeToken typeToken){
        var nameTypeToken = typeToken.getName();
        return this.validateToken(token) &&  nameTypeToken.equals(extractTypeToken(token));
    }

}
