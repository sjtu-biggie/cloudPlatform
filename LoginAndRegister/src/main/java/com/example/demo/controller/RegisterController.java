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
        String sid=request.getParameter("sid");
        String email=request.getParameter("email");
        String telephone=request.getParameter("telephone");
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setSid(sid);
        user.setTelephone(telephone);
        userMapper.save(user);
        return  "login";
    }

}
