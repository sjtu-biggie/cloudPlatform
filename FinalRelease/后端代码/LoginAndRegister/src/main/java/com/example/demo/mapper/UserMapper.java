package com.example.demo.mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {
    @Insert("insert into userdemo (username,nickname,password,sid,email,telephone) values (#{username},#{nickname},#{password},#{sid},#{email},#{telephone})")
    public void save(User user);

    @Select("select * from userdemo where username=#{username} and password =#{password}")
    public User getUser(String username, String password);

    @Select("select * from userdemo where username=#{username}")
    public User testUsername(String username);

    @Select("select * from userdemo where email=#{email}")
    public User testEmail(String email);

    @Select("select * from userdemo where sid=#{sid}")
    public User testSid(String sid);
}
