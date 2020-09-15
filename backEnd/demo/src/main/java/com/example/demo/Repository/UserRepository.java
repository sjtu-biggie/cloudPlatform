package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepositoriy{
    @Query(value = "select * from user where nickname = :name", nativeQuery = true)
    User getUserByName(@Param("name") String name);

    @Query(value = "select * from user where user_id = :id", nativeQuery = true)
    User getUserById(@Param("id") int id);
}
