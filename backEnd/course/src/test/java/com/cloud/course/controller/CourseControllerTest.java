package com.cloud.course.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.*;
import com.cloud.course.repository.*;
import com.cloud.course.service.CourseService;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Date;
import java.util.List;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
public class CourseControllerTest<Transactional> {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private CourseService courseService;

    @Autowired
    private CourseBulletinRepository courseBulletinRepository;

    @Autowired
    private CourseInfoRepository courseInfoRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private StudentCourseRepository studentCourseRepository;

    private MockMvc mockMvc;

    @Before
    public void before() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Date date = new Date(0);
        Course course = new Course(1,"student","mathclass",date,date,"math","first","F1803705",true,true,true,true,true);
        CourseBulletin courseBulletin = new CourseBulletin(1,1,"bulletin","bulletincontent",date);
        CourseInfo courseInfo = new CourseInfo(1,"detail","introduction",null,"textbook");
        Notification notification = new Notification(1,"student","student","notetitle",date,true,"notecontent");
        StudentCourseInfo studentCourseInfo = new StudentCourseInfo("student",1,90.0,0,date,"xiaoming","F1803705","518021910896");
        courseRepository.save(course);
        courseBulletinRepository.save(courseBulletin);
        courseInfoRepository.save(courseInfo);
        noteRepository.save(notification);
        studentCourseRepository.save(studentCourseInfo);
    }

    @After
    public void after() throws Exception {
    }
    @Test
    public void contextLoads() {
    }

    @Test
    public void getAllCourses() throws Exception {
        List<WholeCourse> courseList =courseService.getAllCoursesN();
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getCourses")//使用get方式来调用接口。
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        System.out.println(jsonArray.getJSONObject(0));
        Assert.assertEquals(jsonArray.getJSONObject(0).getJSONObject("course").getString("courseName"), "mathclass");
    }

    @Test
    public void getAllCourses_page() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getCourses")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("page", "0")//请求的参数（可多个）
                .param("size", "1")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        System.out.println(jsonArray.getJSONObject(0));
        Assert.assertEquals(jsonArray.getJSONObject(0).getJSONObject("course").getString("classes"), "F1803705");
    }

    @Test
    public void getCourseById() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getCourseById")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("courseId", "1")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONObject jsonObject = JSONObject.parseObject(result);
        Assert.assertEquals(jsonObject.getJSONObject("course").getString("grade"), "first");
    }

    @Test
    public void getCoursesByTeacher() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getCoursesByTeacherPage")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("page", "0")//请求的参数（可多个）
                .param("size", "1")//请求的参数（可多个）
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        assertNull(jsonArray);
    }

    @Test
    public void getCoursesByStudent() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getCoursesByUserPage")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("page", "0")//请求的参数（可多个）
                .param("size", "1")//请求的参数（可多个）
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        assertNull(jsonArray);

    }

    @Test
    public void getCoursesByTeacherN() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getCoursesByTeacher")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        System.out.println(jsonArray);
        assertEquals(jsonArray.size(),0);
    }

    @Test
    public void getCoursesByStudentN() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getCoursesByUser")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        Assert.assertEquals(jsonArray.size(),0);
    }

    @Test
    public void getStudentEndCourses() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getEndCoursesByUser")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        System.out.println(jsonArray.getJSONObject(0));
        Assert.assertEquals(jsonArray.getJSONObject(0).getJSONObject("course").getString("classes"), "F1803705");
    }

    @Test
    public void getTeacherEndCourses() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getEndCoursesByTeacher")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        System.out.println(jsonArray.getJSONObject(0));
        Assert.assertEquals(jsonArray.getJSONObject(0).getJSONObject("course").getString("grade"), "first");
    }

    @Test
    public void getNoteByUser() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getNoteByUser")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        Assert.assertEquals(jsonArray.getJSONObject(0).getString("title"), "notetitle");
    }

    @Test
    public void getNoteById() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getNoteById")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("notificationId", "1")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONObject jsonObject = JSONObject.parseObject(result);
        Assert.assertEquals(jsonObject.getString("title"), "notetitle");
    }

    @Test
    public void addNote() throws Exception {
        Date date = new Date(0);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("receiverId","student");
        jsonObject.put("senderId","student");
        jsonObject.put("title","notetitle");
        jsonObject.put("reading","1");
        jsonObject.put("content","go to the hell");
        jsonObject.put("publishDate",date.toString());
        MvcResult authResult = mockMvc.perform(post("/course/addNote")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .content(jsonObject.toString())//请求的参数（可多个）
        ).andExpect(status().isOk()).andReturn();
        List<Notification> notificationList = noteRepository.findAllBySenderId("student");
        Assert.assertEquals(notificationList.size(),2);
        noteRepository.deleteById(2);
    }

    @Test
    public void deleteNote() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("notificationId","1");
        MvcResult authResult = mockMvc.perform(post("/course/deleteNote")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .content(jsonObject.toString())//请求的参数（可多个）
        ).andExpect(status().isOk()).andReturn();
        List<Notification> notificationList = noteRepository.findAllBySenderId("student");
        Assert.assertNotNull(notificationList);
    }

    @Test
    public void getRank() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getRank")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("courseId", "1")//请求的参数（可多个）
                .param("userId", "student")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONObject jsonObject = JSONObject.parseObject(result);
        Assert.assertEquals(jsonObject.getInteger("rank"), Integer.valueOf(1));
    }

    @Test
    public void getPageBulletins() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getPageBulletin")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("size", "1")//请求的参数（可多个）
                .param("page", "0")//请求的参数（可多个）
                .param("courseId", "1")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONObject jsonObject = JSONObject.parseObject(result);
        Assert.assertNotNull(jsonObject);
    }

    @Test
    public void getBulletin() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/course/getBulletin")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("courseId", "1")//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        JSONObject jsonObject = jsonArray.getJSONObject(0);
        assertEquals(jsonObject.getString("content"),"bulletincontent");

    }

    @Test
    public void deleteBulletin() throws Exception {
        MvcResult authResult;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("bulletinId","1");
        authResult = mockMvc.perform(post("/course/deleteBulletin")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .content(jsonObject.toString())//请求的参数（可多个）
        ).andExpect(status().isOk())
                .andReturn();
        List<CourseBulletin> courseBulletinList = courseBulletinRepository.findAll();
        Assert.assertEquals(courseBulletinList.size(),0);

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