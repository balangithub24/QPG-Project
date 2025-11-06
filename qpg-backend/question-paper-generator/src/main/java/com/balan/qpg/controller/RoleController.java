package com.balan.qpg.controller;

import com.balan.qpg.model.Role;
import com.balan.qpg.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    // Create Role (Admin Only)
    @PostMapping("/add")
    public Role addRole(@RequestBody Role role) {
        // Check if role already exists
        return roleRepository.findByName(role.getName())
                .orElseGet(() -> roleRepository.save(role));
    }
}
