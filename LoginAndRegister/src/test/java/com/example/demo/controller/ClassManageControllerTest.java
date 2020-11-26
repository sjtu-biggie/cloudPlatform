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

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClassManageControllerTest {
    @Autowired(required = false)
    private ClassManageController classManageController;
    @Autowired(required = false)
    private ClassManage classManage;
    JSONObject testData1;

    @Before
    public void setUp() throws Exception {
        //暂时还不需要这一步就能够自动注入
        //MockMvc mvc = MockMvcBuilders.standaloneSetup(classManageController).build();
        testData1 = new JSONObject();
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void addClass() {
        testData1.put("classNo", "F1803711");
        testData1.put("number", 0);
        testData1.put("classManager", "518030910213");
        System.out.println(testData1);
        assertEquals("添加班级成功", classManageController.addClass(testData1));
    }

    @Test
    public void testGetClass() {
    }

    @Test
    public void updateClass() {
        testData1.put("classNo", "F1803702");
        testData1.put("number", 1);
        System.out.println(testData1);
        assertEquals("成功增加学生人数", classManageController.updateClass(testData1));
    }

    @Test
    public void getAllClassByManager() {
    }

    @Test
    public void getAllClass() {
    }
}