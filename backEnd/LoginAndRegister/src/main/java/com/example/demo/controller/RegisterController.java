package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 注册中心
 * @author zf
 * @version 1.8
 * @since 1.8
 */
@CrossOrigin(origins = "*")
@RestController
public class RegisterController {
    @Autowired(required = false)
    private UserMapper userMapper;

    /**
     * 验证并注册用户信息
     * @param obj 包含注册表中的信息
     * @return 返回一段文字表明是否存在冲突或者成功注册
     */
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
        return "注册成功";
    }
}
