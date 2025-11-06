package com.balan.qpg.serviceImpl;

import com.balan.qpg.model.Role;
import com.balan.qpg.model.User;
import com.balan.qpg.repository.RoleRepository;
import com.balan.qpg.repository.UserRepository;
import com.balan.qpg.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository; // ✅ Add this

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository; // ✅ Store it
    }

    @Override
    public User saveUser(User user) {

        // ✅ Assign default role STUDENT
        Role defaultRole = roleRepository.findByName("ROLE_STUDENT")
                .orElseThrow(() -> new RuntimeException("Default Role Not Found! Insert roles into DB."));

        user.getRoles().add(defaultRole);

        // ✅ Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElse(null);
    }
}
