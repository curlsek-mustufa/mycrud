package com.example.mycrud.service.impl;

import com.example.mycrud.model.User;
import com.example.mycrud.repository.UserRepository;
import com.example.mycrud.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        // Optionally ensure email uniqueness
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(String id, User user) {
        return userRepository.findById(id)
                .map(existing -> {
                    existing.setName(user.getName());
                    existing.setEmail(user.getEmail());
                    existing.setCountry(user.getCountry());
                    existing.setOccupation(user.getOccupation());
                    return userRepository.save(existing);
                })
                .orElseGet(() -> {
                    user.setId(id);
                    return userRepository.save(user);
                });
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}

