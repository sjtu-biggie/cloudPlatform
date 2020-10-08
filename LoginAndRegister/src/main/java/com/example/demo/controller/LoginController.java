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

@RestController
public class LoginController {
    @Autowired(required = false)
    private UserMapper userMapper;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(@RequestBody JSONObject obj) {
        String username=obj.getString("username");
        String password=obj.getString("password");
        User user=userMapper.getUser(username,password);
        if (user!=null)
        {
            return "成功登陆";
        }
        else {
            return "登陆失败";
        }
    }

//
//    @RequestMapping("/addLogin")
//    public String addLogin(HttpServletRequest request, Model model, Map<String,Object> map){
//        String username=request.getParameter("username");
//        String password=request.getParameter("password");
//        User user=userMapper.Identify(username,password);
//        if (user!=null)
//        {
//            model.addAttribute("user",username);
//            map.put("msg","登陆成功");
//            return "login";
//        }
//        else {
//            map.put("msg","登陆失败");
//            return "register";
//        }
//    }

}
