package org.example.backend.Controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.backend.Dto.Request.UserCreateRequest;
import org.example.backend.Entity.AuthUser;
import org.example.backend.Dto.Request.RefreshTokenRequest;
import org.example.backend.Dto.Request.UserRequest;
import org.example.backend.Dto.Response.AuthenticationResponse;
import org.example.backend.Service.AuthUserDetailsService;
import org.example.backend.Service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.example.backend.Entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthUserDetailsService userService;
    private final AuthenticationService authenticationService;
    private static final Logger log =  LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/register")
    public ResponseEntity<?>  createUser(@RequestBody UserCreateRequest userCreateRequest)
    {
        userService.createUser(userCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody UserRequest userRequest) {
        log.info("Hello world");
        var response = authenticationService.login(userRequest);
        log.info("Login endpoint called");
        return ResponseEntity.ok(response);
//        ResponseCookie cookie = ResponseCookie.from("access_token", jwtAccess)
//                .httpOnly(true)
//                .secure(false)
//                .path("/")
//                .maxAge(jwtAccessExpiration)
//                .sameSite("Strict")
//                .build();

//        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, cookie.toString())
//                .body("Login success!");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestBody RefreshTokenRequest refreshTokenRequest,
            @AuthenticationPrincipal AuthUser authUser,
            HttpServletRequest request){

        var jwt = request.getHeader("Authorization").substring(7);
        authenticationService.logout(refreshTokenRequest, authUser, jwt);
        return ResponseEntity.noContent().build();

    }

    @PostMapping("/token/refresh")
    public ResponseEntity<AuthenticationResponse> getNewAccessToken(
            @RequestBody RefreshTokenRequest refreshTokenRequest){

        var response = authenticationService.getNewToken(refreshTokenRequest);
        return ResponseEntity.ok(response);
    }

}
