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

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class RegisterControllerTest {
    @Autowired(required = false)
    private RegisterController registerController;

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
    void register() {
        testData.put("username","manager");
        assertEquals("账户名称已存在",registerController.register(testData));
        testData.put("username","manage");
        testData.put("nickname","manage");
        testData.put("password","manage");
        testData.put("sid","518021911003");
        assertEquals("学号已存在",registerController.register(testData));
        testData.put("sid","568736543897987");
        testData.put("email","1921209391@qq.com");
        assertEquals("邮箱已存在",registerController.register(testData));
        testData.put("email","65837183@qq.com");
        testData.put("telephone","4532766");
        assertEquals("注册成功",registerController.register(testData));
    }
}