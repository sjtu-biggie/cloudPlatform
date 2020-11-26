package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.repository.UserIconRepository;
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
public class RegisterControllerTest {
    @Autowired
    private RegisterController registerController;
    @Autowired(required = false)
    private UserMapper userMapper;
    @Autowired(required = false)
    private UserIconRepository userIconRepository;
    @Autowired(required = false)
    private LoginService loginService;
    @Autowired
    private UserManageController userManageController;

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
    public void register() {
        testData.put("username","manager");
        testData.put("password","test");
        testData.put("nickname","test");
        testData.put("sid","541234324243");
        testData.put("email","11481042653@qq.com");
        assertEquals("账户名称已存在",registerController.register(testData));
        testData.put("username","test");
        assertEquals("学号已存在",registerController.register(testData));
        testData.put("sid","5180309101011");
        assertEquals("邮箱已存在",registerController.register(testData));
        testData.put("email","45276@qq.com");
        assertEquals("注册成功",registerController.register(testData));
    }

    @Test
    public void updateUser() {
        testData.put("username","manage");
        testData.put("password","manager");
        testData.put("sid","541234324243");
        testData.put("email","zhull981122@sjtu.edu.cn");
        testData.put("telephone","13333444444");
        testData.put("type","manager");
        testData.put("nickname","管理员");
        testData.put("theGrade","");
        testData.put("theClass","");
        assertEquals("没有这样的用户名称",registerController.updateUser(testData));
        testData.put("username","manager");
        assertEquals("更新成功",registerController.updateUser(testData));
    }

    @Test
    public void updateUserByTeacher() {
        testData.put("username","manage");
        testData.put("sid","541234324243");
        testData.put("email","zhull981122@sjtu.edu.cn");
        testData.put("telephone","13333444444");
        testData.put("type","manager");
        testData.put("nickname","管理员");
        testData.put("theGrade","");
        testData.put("theClass","");
        assertEquals("没有这样的用户名称",registerController.updateUser(testData));
        testData.put("username","manager");
        assertEquals("更新成功",registerController.updateUser(testData));
    }

    @Test
    public void registerByManager() {
        JSONObject users=new JSONObject();
        users.put("username","testRegisterByManager");
        users.put("sid","61287794");
        users.put("email","467328@sjtu.edu.cn");
        users.put("telephone","5497684938739");
        users.put("type","student");
        users.put("nickname","test");
        users.put("theGrade","");
        users.put("theClass","");
        JSONArray testArray=new JSONArray();
        testArray.add(users);
        testData.put("users",testArray);
        assertEquals("注册成功",registerController.registerByManager(testData));
    }

    @Test
    public void delUser(){
        testData.put("name","test");
        assertEquals("删除成功",userManageController.delUser(testData));
        testData.put("name","testRegisterByManager");
        assertEquals("删除成功",userManageController.delUser(testData));

    }
}

