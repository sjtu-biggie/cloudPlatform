package com.example.demo.Mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Insert("insert into userdemo (username,password,sid,email,telephone) values (#{username},#{password},#{sid},#{email},#{telephone})")
    public void save(User user);

    @Select("select * from userdemo where username=#{username} and password =#{password}")
    User Identify(String username, String password);
}
