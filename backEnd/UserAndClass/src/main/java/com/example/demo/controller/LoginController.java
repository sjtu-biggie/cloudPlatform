package com.example.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
//import com.example.demo.model.UserIcon;
//import com.example.demo.repository.UserIconRepository;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class LoginController {
    @Autowired(required = false)
    private UserMapper userMapper;
    @Autowired(required = false)
    private LoginService loginService;

    @RequestMapping(value = "/getUserMessage", method = RequestMethod.POST)
    public User getUserMessage(@RequestBody JSONObject obj) {
        String username = obj.getString("username");
        User user1 = userMapper.getUserMessage(username);
        return user1;
    }

    @RequestMapping(value = "/getUserMessageAndIcon", method = RequestMethod.POST)
    public User getUserMessageAndIcon(@RequestBody JSONObject obj) {
            System.out.println("进入Controller获取全部信息");
            return loginService.getUserMessageAndIcon(obj);
    }

    @RequestMapping(value = "/getUserIcon",method = RequestMethod.POST)
    public String getUserIcon(@RequestBody JSONObject obj){
        String username=obj.getString("username");
        System.out.println("进入controller获取用户头像");
        return loginService.getUserIcon(username);
    }
}