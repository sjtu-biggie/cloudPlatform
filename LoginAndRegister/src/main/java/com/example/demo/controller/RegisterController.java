package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class RegisterController {
    @Autowired(required = false)
    private UserMapper userMapper;

    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public String register(@RequestBody JSONObject obj){
        String username=obj.getString("username");
        String password=obj.getString("password");
        String sid=obj.getString("sid");
        String email=obj.getString("email");
        String telephone=obj.getString("telephone");
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setSid(sid);
        user.setTelephone(telephone);
        userMapper.save(user);
        return "注册成功";
    }


    @RequestMapping(value = "/updateUser",method = RequestMethod.POST)
    public String updateUser(@RequestBody JSONObject obj){
        String username=obj.getString("username");
        String password=obj.getString("password");
        String sid=obj.getString("sid");
        String email=obj.getString("email");
        String telephone=obj.getString("telephone");
        String type=obj.getString("type");
        String nickname=obj.getString("nickname");
        String theGrade=obj.getString("theGrade");
        String theClass=obj.getString("theClass");
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setSid(sid);
        user.setTelephone(telephone);
        user.setType(type);
        user.setNickname(nickname);
        user.setTheClass(theClass);
        user.setTheGrade(theGrade);
        userMapper.updateUser(user);
        return  "更新成功";
    }
}
