package com.example.demo.repository;

import com.example.demo.model.UserIcon;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserIconRepository extends MongoRepository<UserIcon,Integer> {
    UserIcon findByUsername(@Param("username") String username);
}
