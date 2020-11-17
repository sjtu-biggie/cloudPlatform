package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.model.UserIcon;
import com.example.demo.repository.UserIconRepository;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
public class RegisterController {
    @Autowired(required = false)
    private UserMapper userMapper;
    @Autowired(required = false)
    private UserIconRepository userIconRepository;
    @Autowired(required = false)
    private LoginService loginService;

    private String defaultJpg="data:image/jpg;base64,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";

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String register(@RequestBody JSONObject obj) {
        String username = obj.getString("username");
        User user1 = userMapper.testUsername(username);
        if (user1 != null) {
            return "账户名称已存在";
        }
        String password = obj.getString("password");
        String sid = obj.getString("sid");
        User user2 = userMapper.testSid(sid);
        if (user2 != null) {
            return "学号已存在";
        }
        String email = obj.getString("email");
        User user3 = userMapper.testEmail(email);
        if (user3 != null) {
            return "邮箱已存在";
        }
        String telephone = obj.getString("telephone");
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setSid(sid);
        userMapper.save(user);
        user.setTelephone(telephone);
        try {
            System.out.println("进入储存尝试");
            loginService.setUseIcon(new UserIcon(username, defaultJpg));
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("无头像储存");
            return "头像未储存";
        }
        return "注册成功";
    }


    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    public String updateUser(@RequestBody JSONObject obj) {
        System.out.println(obj);
        String username = obj.getString("username");
        String password = obj.getString("password");
        String sid = obj.getString("sid");
        String email = obj.getString("email");
        String telephone = obj.getString("telephone");
        String type = obj.getString("type");
        String nickname = obj.getString("nickname");
        String theGrade = obj.getString("theGrade");
        String theClass = obj.getString("theClass");
        User user1 = userMapper.testUsername(username);
        if (user1 == null) {
            return "没有这样的用户名称";
        }
        User user = new User();
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
        return "更新成功";
    }

    @RequestMapping(value = "/updateUserByTeacher", method = RequestMethod.POST)
    public String updateUserByTeacher(@RequestBody JSONObject obj) {
        String username = obj.getString("username");
        String sid = obj.getString("sid");
        String email = obj.getString("email");
        String telephone = obj.getString("telephone");
        String type = obj.getString("type");
        String nickname = obj.getString("nickname");
        String theGrade = obj.getString("theGrade");
        String theClass = obj.getString("theClass");
        User user1 = userMapper.testUsername(username);
        if (user1 == null) {
            return "没有这样的用户名称";
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setSid(sid);
        user.setTelephone(telephone);
        user.setType(type);
        user.setNickname(nickname);
        user.setTheClass(theClass);
        user.setTheGrade(theGrade);
        userMapper.updateUserByTeacher(user);
        return "更新成功";
    }

    @RequestMapping(value = "/registerByManager",method = RequestMethod.POST)
    public String registerByManager(@RequestBody JSONObject obj){
        System.out.println("开始调用管理员注册用户");
        JSONArray users=obj.getJSONArray("users");
        User user1;
        for (Object s:users){
            System.out.println(s);
        }
        return "注册成功";
    }


}
