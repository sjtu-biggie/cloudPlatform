package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.model.ClassManage;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClassManageControllerTest {
    @Autowired(required = false)
    private ClassManageController classManageController;
    @Autowired(required = false)
    private ClassManage classManage;

    JSONObject testData;

    @Before
    public void setUp() throws Exception {
        //暂时还不需要这一步就能够自动注入
        //MockMvc mvc = MockMvcBuilders.standaloneSetup(classManageController).build();
        testData = new JSONObject();
        System.out.println("setUp");
    }

    @After
    public void tearDown() throws Exception {
        testData=null;
        System.out.println("tearDown");
    }

    @Test
    public void addClass() {
        testData.put("classNo", "F1803712");
        testData.put("number", 0);
        testData.put("classManager", "518030910213");
        System.out.println(testData);
        assertEquals("添加班级成功", classManageController.addClass(testData));
    }

    @Test
    public void testGetClass() {
        testData.put("classNo","F1803702");
        assertEquals("找到这样的班级",classManageController.getClass(testData));
    }

    @Test
    public void updateClass() {
        testData.put("classNo", "F1803702");
        testData.put("number", 1);
        System.out.println(testData);
        assertEquals("成功增加学生人数", classManageController.updateClass(testData));
    }

    @Test
    public void getAllClassByManager() {
        testData.put("sid","518030910213");
        System.out.println(classManageController.getAllClassByManager(testData));
    }

    @Test
    public void getAllClass() {
        System.out.println(classManageController.getAllClass());
    }
}