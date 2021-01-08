package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.model.UserIcon;
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

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserManageControllerTest {
    @Autowired
    private UserManageController userManageController;
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
    public void delUser() {
    }

    @Test
    public void setUserType() {
        testData.put("username","student");
        testData.put("type","student");
        assertEquals("更改完成",userManageController.setUserType(testData));
        testData.put("username","teacher");
        testData.put("type","teacher");
        assertEquals("更改完成",userManageController.setUserType(testData));
    }

    @Test
    public void getAllUsers() {
    }

    @Test
    public void getAllStudentsByClass() {
    }

    @Test
    public void deleteStudentFromClass() {
    }

    @Test
    public void getAllUsersByClassIds() {
        JSONArray classIds=new JSONArray();
        classIds.add("F1803702");
        classIds.add("F1803701");
        testData.put("classIds",classIds);
        System.out.println(userManageController.getAllUsersByClassIds(testData));
    }

    @Test
    public void getUserBySid() {
        testData.put("sid","541234324243");
        assertEquals("manager",userManageController.getUserBySid(testData).getUsername());
    }

    @Test
    public void getAllStudentsByTheClass() {
        testData.put("theClass","F1803702");
        System.out.println(userManageController.getAllStudentsByTheClass(testData));
    }

    @Test
    public void addStudentToClass() {
        testData.put("username","manager");
        testData.put("theClass","F1803702");
        assertEquals("添加完成",userManageController.addStudentToClass(testData));
        testData.put("theClass","");
        assertEquals("添加完成",userManageController.addStudentToClass(testData));
    }
}