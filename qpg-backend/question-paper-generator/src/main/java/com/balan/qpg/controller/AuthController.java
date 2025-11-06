package com.balan.qpg.controller;

import com.balan.qpg.model.Role;
import com.balan.qpg.model.User;
import com.balan.qpg.payload.LoginResponse;
import com.balan.qpg.repository.RoleRepository;
import com.balan.qpg.repository.UserRepository;
import com.balan.qpg.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Register user (default role: STUDENT)
    @PostMapping("/register")
    public String registerUser(@RequestBody User userRequest) {

        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            return "❌ Username already exists!";
        }

        // Encode password
        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        // Assign default role
        Role defaultRole = roleRepository.findByName("ROLE_STUDENT")
                .orElseThrow(() -> new RuntimeException("Default Role Not Found!"));

        userRequest.getRoles().add(defaultRole);
        userRepository.save(userRequest);

        return "✅ User Registered Successfully!";
    }

    // ✅ Login and return JWT Token + Role
    @PostMapping("/login")
    public LoginResponse login(@RequestBody User loginRequest) {

        // Authenticate credentials
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // Fetch user from DB
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        // Get the first role (ADMIN / TEACHER / STUDENT)
        String role = user.getRoles().iterator().next().getName();

        // ✅ Generate JWT token with username and role
        String token = jwtUtil.generateToken(authentication.getName(), role);

        // ✅ Return response
        return new LoginResponse(token, role, user.getUsername());
    }
}
