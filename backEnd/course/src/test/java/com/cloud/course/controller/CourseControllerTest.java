package com.cloud.course.controller;

import com.cloud.course.entity.*;
import com.cloud.course.service.CourseService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Date;

import static org.junit.Assert.*;
@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
public class CourseControllerTest<Transactional> {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private CourseService courseService;
    private MockMvc mockMvc;

    @Before
    public void before() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Date date = new Date(0);
        Course course = new Course(1,"student","数学课",date,date,"数学","一年级上","F1803705",true,true,true,true,true);
        CourseBulletin courseBulletin = new CourseBulletin(1,1,"公告","公告内容",date);
        CourseInfo courseInfo = new CourseInfo(1,"细节","介绍",null,"教材");
        Notification notification = new Notification(1,"student","student","通知标题",date,true,"通知内容");
        StudentCourseInfo studentCourseInfo = new StudentCourseInfo();
    }

    @After
    public void after() throws Exception {
    }
    @Test
    public void contextLoads() {
    }

    @Test
    public void getAllCourses() {
    }

    @Test
    public void getAllCourses1() {
    }

    @Test
    public void getCourseById() {
    }

    @Test
    public void getCoursesByTeacher() {
    }

    @Test
    public void getCoursesByStudent() {
    }

    @Test
    public void getCoursesByTeacherN() {
    }

    @Test
    public void getCoursesByStudentN() {
    }

    @Test
    public void getStudentEndCourses() {
    }

    @Test
    public void getTeacherEndCourses() {
    }

    @Test
    public void getNoteByUser() {
    }

    @Test
    public void getNoteById() {
    }

    @Test
    public void addNote() {
    }

    @Test
    public void deleteNote() {
    }

    @Test
    public void getRank() {
    }

    @Test
    public void getPageBulletins() {
    }

    @Test
    public void getBulletin() {
    }

    @Test
    public void deleteBulletin() {
    }

    @Test
    public void addBulletin() {
    }

    @Test
    public void deleteCourse() {
    }

    @Test
    public void addCourse() {
    }

    @Test
    public void register() {
    }

    @Test
    public void getCourseStudent() {
    }

    @Test
    public void deleteCourseStudent() {
    }

    @Test
    public void updateCourseStudent() {
    }
}