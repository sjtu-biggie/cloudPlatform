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

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String register(@RequestBody JSONObject obj) {
        String username = obj.getString("username");
        User user1 = userMapper.testUsername(username);
        if (user1 != null) {
            return "账户名称已存在";
        }
        String nickname= obj.getString("nickname");
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
        user.setNickname(nickname);
        user.setPassword(password);
        user.setEmail(email);
        user.setSid(sid);
        user.setTelephone(telephone);
        userMapper.save(user);

//        try {
//            System.out.println("进入储存尝试");
//            loginService.setUseIcon(new UserIcon(username, defaultJpg));
//        } catch (Exception e) {
//            e.printStackTrace();
//            System.out.println("无头像储存");
//            return "头像未储存";
//        }
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
        for (int i=0;i<users.size();++i){
            JSONObject getUser=users.getJSONObject(i);
            User registerUser=new User();
            registerUser.setUsername(getUser.getString("username"));
            registerUser.setPassword(getUser.getString("password"));
            registerUser.setEmail(getUser.getString("email"));
            registerUser.setSid(getUser.getString("sid"));
            registerUser.setTelephone(getUser.getString("telephone"));
            registerUser.setType(getUser.getString("type"));
            registerUser.setNickname(getUser.getString("nickname"));
            registerUser.setTheClass(getUser.getString("theClass"));
            registerUser.setTheGrade(getUser.getString("theGrade"));
            userMapper.registerByManager(registerUser);
        }
        return "注册成功";
    }

}
