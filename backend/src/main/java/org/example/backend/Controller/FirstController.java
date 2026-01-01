package org.example.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirstController {

    @GetMapping("/hello")
    public String hello() {
        return "this is my first endpoint updated";
    }

    @GetMapping("/goodbye")
    public String goodbye(){
        return "this endpint have permited only user authenticated";
    }
}
