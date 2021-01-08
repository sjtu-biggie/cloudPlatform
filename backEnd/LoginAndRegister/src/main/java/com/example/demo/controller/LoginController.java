package com.example.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 登陆
 */
@CrossOrigin(origins = "*")
@RestController
public class LoginController {
    @Autowired(required = false)
    private UserMapper userMapper;

    /**
     * 验证用户是否存在
     * @param obj 包含用户名和密码两个信息
     * @return 一段文字表明状态
     */
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
}