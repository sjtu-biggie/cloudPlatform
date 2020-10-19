package com.example.demo.repository;

import com.example.demo.model.UserIcon;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "userIcon")
public interface UserIconRepository extends MongoRepository<UserIcon,String> {
    UserIcon findByUsername(String username);
}
