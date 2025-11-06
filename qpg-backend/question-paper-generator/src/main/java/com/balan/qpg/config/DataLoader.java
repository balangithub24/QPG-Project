package com.balan.qpg.config;

import com.balan.qpg.model.Role;
import com.balan.qpg.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataLoader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }
        if (roleRepository.findByName("ROLE_TEACHER").isEmpty()) {
            roleRepository.save(new Role("ROLE_TEACHER"));
        }
        if (roleRepository.findByName("ROLE_STUDENT").isEmpty()) {
            roleRepository.save(new Role("ROLE_STUDENT"));
        }

    }
}
