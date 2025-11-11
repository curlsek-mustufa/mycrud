package com.example.mycrud.service;

import com.example.mycrud.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    Optional<User> getUserById(String id);
    User updateUser(String id, User user);
    void deleteUser(String id);
}

