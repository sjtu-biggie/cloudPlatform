package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import sun.rmi.runtime.Log;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class LoginControllerTest {
    @Autowired(required = false)
    private LoginController loginController;

    private JSONObject testData;

    @BeforeEach
    void setUp() {
        testData=new JSONObject();
    }

    @AfterEach
    void tearDown() {
        testData=null;
    }

    @Test
    void login() {
        testData.put("username","fgjhdas");
        assertEquals("用户名称错误",loginController.login(testData));
        testData.put("username","manager");
        assertEquals("密码错误",loginController.login(testData));
        testData.put("password","manager");
        assertEquals("成功登陆",loginController.login(testData));
    }
}
