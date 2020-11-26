package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class ClassManageControllerTest {
    JSONObject testData1;

    @Before
    public void setUp() throws Exception {
         testData1=new JSONObject();
         testData1.put("classNo","F1803702");
         testData1.put("number",1);
         System.out.println(testData1);
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void addClass() {
    }

    @Test
    public void testGetClass() {
    }

    @Test
    public void updateClass() {
        System.out.println(testData1);
        assertEquals("成功增加班级人数",new ClassManageController().updateClass(testData1));
    }

    @Test
    public void getAllClassByManager() {
    }

    @Test
    public void getAllClass() {
    }
}