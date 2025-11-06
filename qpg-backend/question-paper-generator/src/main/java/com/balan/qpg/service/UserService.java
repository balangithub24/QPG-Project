package com.balan.qpg.service;

import com.balan.qpg.model.User;

public interface UserService {
    User saveUser(User user);
    User findByUsername(String username);
}
