package com.example.demo.controller;

import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class RegisterController {
    @Autowired(required = false)
    private UserMapper userMapper;

    @GetMapping("/")
    public String Register(){
        return "register";
    }

    @RequestMapping("/addUser")
    public String register(HttpServletRequest request){
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        User user=new User();
        user.setUserName(username);
        user.setPassword(password);
        userMapper.save(user);
        return  "login";
    }

}
