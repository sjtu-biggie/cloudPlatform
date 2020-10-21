package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class UserManageController {
    @Autowired(required = false)
    private UserMapper userMapper;

    @RequestMapping(value = "/delUser",method = RequestMethod.POST)
    public String delUser(@RequestBody JSONObject obj){
        String username=obj.getString("name");
        userMapper.delUser(username);
        return "Fsadf";
    }

    @RequestMapping(value = "/getAllUsers",method = RequestMethod.POST)
    public List<User> getAllUsers(){
        List<User> users=userMapper.getAllUsers();
        System.out.println(users);
        return users;
    }

    @RequestMapping(value = "/getAllStudentsByClass",method = RequestMethod.POST)
    public List<User> getAllStudentsByClass(@RequestBody JSONObject obj){
        String theClass = obj.getString("range");
        List<User> users=userMapper.getAllStudentsByClass(theClass);
        return  users;
    }
}
