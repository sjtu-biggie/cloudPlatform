package com.example.demo.Mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Insert("insert into user (username,password) values (#{username},#{password})")
    public void save(User user);

    @Select("select * from user where username=#{username} and password =#{password}")
    User Identify(String username, String password);
}
