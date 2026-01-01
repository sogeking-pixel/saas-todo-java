package org.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.Dto.Response.UserResponse;
import org.example.backend.Entity.AuthUser;
import org.example.backend.Service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getProfile(@AuthenticationPrincipal AuthUser authUser){
        var username = authUser.getUsername();
        var userResponse = profileService.getMe(username);

        return ResponseEntity.ok().body(userResponse);

    }
}

