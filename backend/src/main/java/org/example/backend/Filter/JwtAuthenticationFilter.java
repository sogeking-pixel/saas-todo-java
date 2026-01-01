package org.example.backend.Filter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.example.backend.Enums.TypeToken;
import org.example.backend.Exceptions.RevokedTokenException;
import org.example.backend.Service.BlackListService;
import org.example.backend.Service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final BlackListService blacklistService;


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        try
        {
            final String token = this.extractToken(request);

            if (token != null) {
                this.processAuthentication(token, request);
            }

            filterChain.doFilter(request, response);

        }
        catch (RevokedTokenException e){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage() );
        }

    }

    private String extractTokenByCookie(HttpServletRequest request){

        if (request.getCookies() == null ) return null;

        for (Cookie cookie : request.getCookies()) {
            if ("access_token".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }

    private String extractTokenByHeader(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        return authHeader.substring(7);
    }

    private String extractToken(HttpServletRequest request){

        final var tokenByCookie = this.extractTokenByCookie(request);
        if(tokenByCookie != null) return tokenByCookie;

        final var tokenByHeader = this.extractTokenByHeader(request);
        if(tokenByHeader != null) return tokenByHeader;

        return null;

    }

    private void processAuthentication(String token, HttpServletRequest request) throws RevokedTokenException {

        final String jti = jwtService.extractClaim(token, Claims::getId);
        final String username;

        if (blacklistService.isBlacklisted(jti)) {
            throw new RevokedTokenException("Token revoked");
        }

        username = jwtService.extractUsername(token);

        var authenticated = SecurityContextHolder.getContext().getAuthentication();

        if( username == null || authenticated != null) return;

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if( !jwtService.validateTokenAndTypeToken(token, userDetails, TypeToken.ACCESS_TOKEN) ) return;

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());

        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authToken);

    }


}