package com.example.demo.controller;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SendMessageTest {
    @Autowired
    private SendMessage sendMessage;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
        System.out.println(sendMessage.sendMessage("15216678607"));
    }

    @Test
    public void sendMessage() {
    }
}