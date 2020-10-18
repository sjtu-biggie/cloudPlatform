package com.example.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
}
