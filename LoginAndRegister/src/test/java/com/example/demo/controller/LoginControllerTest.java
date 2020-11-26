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
public class LoginControllerTest {
    @Autowired
    private LoginController loginController;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void login() {
    }

    @Test
    public void getUserMessage() {
    }

    @Test
    public void getUserMessageAndIcon() {
    }

    @Test
    public void getUserIcon() {
    }
}