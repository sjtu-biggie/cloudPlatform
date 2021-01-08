package com.example.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class LoginController {
    @Autowired(required = false)
    private UserMapper userMapper;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody JSONObject obj) {
        String username = obj.getString("username");
        String password = obj.getString("password");
        User user1 = userMapper.testUsername(username);
        if (user1 == null) {
            return "用户名称错误";
        }
        User user = userMapper.getUser(username, password);
        if (user != null) {
            return "成功登陆";
        } else {
            return "密码错误";
        }
    }

    @RequestMapping(value = "/getUserMessage", method = RequestMethod.POST)
    public User getUserMessage(@RequestBody JSONObject obj) {
        String username = obj.getString("username");
        User user1 = userMapper.getUserMessage(username);
        return user1;
    }
}