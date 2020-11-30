package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.service.LoginService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoginControllerTest {
    @Autowired
    private LoginController loginController;
    @Autowired(required = false)
    private UserMapper userMapper;
    @Autowired(required = false)
    private LoginService loginService;

    private JSONObject testData;

    @Before
    public void setUp() throws Exception {
        testData=new JSONObject();
        System.out.println("setUp");
    }

    @After
    public void tearDown() throws Exception {
        testData=null;
        System.out.println("tearDown");
    }



    @Test
    public void getUserMessage() {
        testData.put("username","manager");
        assertEquals("manager",loginController.getUserMessage(testData).getUsername());
    }

    @Test
    public void getUserMessageAndIcon() {
    }

    @Test
    public void getUserIcon() {
    }
}