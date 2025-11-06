package com.balan.qpg.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserTestController {

    @GetMapping("/home")
    public String home() {
        return "Welcome! Authenticated Successfully ✅";
    }
}
