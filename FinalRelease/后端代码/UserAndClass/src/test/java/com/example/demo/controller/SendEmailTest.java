package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SendEmailTest {
    @Autowired
    private SendEmail sendEmail;

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
    public void sendNotice() {
        JSONArray tos=new JSONArray();
        tos.add("1921209391@qq.com");
        tos.add("ynjgzfly@163.com");
        testData.put("tos",tos);
        testData.put("context","junit测试");
        assertEquals("发送完成",sendEmail.sendNotice(testData));
    }
}