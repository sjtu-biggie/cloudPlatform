package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.model.UserIcon;
import com.example.demo.repository.UserIconRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Repository
public class LoginDao {
    @Autowired(required = false)
    private UserMapper userMapper;
    @Autowired(required = false)
    private UserIconRepository userIconRepository;


    public User getUserMessageAndIcon(@RequestBody JSONObject obj){
        String username = obj.getString("username");
        User user1 = userMapper.getUserMessage(username);
        Optional<UserIcon> icon= Optional.ofNullable(userIconRepository.findByUsername(username));
        if (icon.isPresent()){
            System.out.println("not null"+username);
            user1.setIcon(icon.get());
        }else {
            user1.setIcon(null);
            System.out.println("it is null");
        }
        return user1;
    }
}
