package com.CloudPlatform.controller;


import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.entity.TeacherHomeworkDetail;
import com.CloudPlatform.repository.TeacherHomeworkDetailRepository;
import com.CloudPlatform.repository.TeacherHomeworkRepository;
import com.CloudPlatform.service.TeacherHomeworkService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;
import java.util.Date;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest

public class TeacherHomeworkControllerTest<Transactional> {

    @Autowired
    private TeacherHomeworkDetailRepository teacherHomeworkDetailRepository;

    @Autowired
    private TeacherHomeworkRepository teacherHomeworkRepository;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private TeacherHomeworkService teacherHomeworkService;
    private MockMvc mockMvc;

    @Before
    public void before() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Date date = new Date(0);
        TeacherHomework teacherHomework = new TeacherHomework(1,"teacherId","数学第一次迭代","F803701",
                date,date,"主观题","一年级上数学",23,0,1);
        TeacherHomeworkDetail teacherHomeworkDetail = new TeacherHomeworkDetail("1","1","teacher","作业内容马保国",null,"答案耗子尾汁","/homework/teacher/1605603327495WechatIMG859.jpeg",
                "/homework/teacher/1605603334829WechatIMG859.jpeg");
        teacherHomeworkRepository.save(teacherHomework);
        teacherHomeworkDetailRepository.save(teacherHomeworkDetail);
    }

    @After
    public void after() throws Exception {
    }

    @Test
    public void getHomeworkAll() {
    }

    @Test
    public void getTeacherHomeworkAll() {
    }

    @Test
    public void getTeacherHomeworkOne() {
    }

    @Test
    public void editTeacherHomework() {
    }

    @Test
    public void addTeacherHomework() {
    }

    @Test
    public void deleteTeacherHomeworkAll() {
    }

    @Test
    public void deleteTeacherHomeworkOne() {
    }

    @Test
    public void updateHandinAlready() {
    }
}
