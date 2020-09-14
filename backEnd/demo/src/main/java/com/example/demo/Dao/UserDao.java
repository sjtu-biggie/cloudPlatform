package com.example.demo.Dao;

import com.example.demo.Entity.User;

public interface UserDao {
    User getUserByName(String username);
}
