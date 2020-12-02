package com.CloudPlatform.controller;


import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.entity.TeacherHomeworkDetail;
import com.CloudPlatform.repository.TeacherHomeworkDetailRepository;
import com.CloudPlatform.repository.TeacherHomeworkRepository;
import com.CloudPlatform.service.TeacherHomeworkService;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        TeacherHomework homework = new TeacherHomework(1,"Teacher","数学第一次迭代","F1803704",
                date,date,"主观题","一年级上数学",0,0,1);
        TeacherHomeworkDetail teacherHomeworkDetail = new TeacherHomeworkDetail("4","1","Teacher","作业内容马保国",null,"答案耗子尾汁","/homework/teacher/1605603327495WechatIMG859.jpeg",
                "/homework/teacher/1605603334829WechatIMG859.jpeg");
        int maxId = 0;
        if (teacherHomeworkRepository.getMaxId() == null){
            maxId = 1;
        }
        else{
            maxId = teacherHomeworkRepository.getMaxId()+1;
        }
        teacherHomeworkRepository.Insert(homework.getEndTime(),
                homework.getHandinAmount(),
                homework.getRange(),
                homework.getStartTime(),
                homework.getSubject(),
                homework.getTitle(),
                homework.getType(),
                homework.getCourseId(),
                homework.getTeacherId(),maxId,
                homework.getHandinAlready(),
                homework.getDelayable());
        teacherHomeworkDetailRepository.save(teacherHomeworkDetail);
    }

    @After
    public void after() throws Exception {
    }

    @Test
    public void getHomeworkAll() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/getHomeworkAll")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("teacherId", "Teacher")
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        System.out.println(jsonArray.getJSONObject(0));
        assertNotNull(jsonArray);
    }

    @Test
    public void getTeacherHomeworkAll() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/getTeacherHomeworkAll")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("courseId", "1")
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONArray jsonArray = JSONArray.parseArray(result);
        System.out.println(jsonArray.getJSONObject(0));
        for (int i = 0 ; i < jsonArray.size(); ++i){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            assertNotNull(jsonObject);
        }
    }

    @Test
    public void getTeacherHomeworkOne() throws Exception {
        MvcResult authResult;
        authResult = mockMvc.perform(get("/getTeacherHomeworkOne")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("homeworkId", "4")
        ).andExpect(status().isOk())
                .andReturn();
        String result = authResult.getResponse().getContentAsString();
        JSONObject jsonObject = JSONObject.parseObject(result);
        Assert.assertNotNull(jsonObject);
    }

    @Test
    public void editTeacherHomework() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("homeworkId","4");
        jsonObject.put("courseId","1");
        jsonObject.put("teacherId","Teacher");
        jsonObject.put("title","数学第二次迭代");
        jsonObject.put("startTime","1970-10-10 11:11:11");
        jsonObject.put("endTime","1970-10-10 11:11:11");
        jsonObject.put("range","F1803704");
        jsonObject.put("answer","答案");
        jsonObject.put("subject","一年级上数学");
        jsonObject.put("content","第二次迭代");
        jsonObject.put("syllabus",null);
        jsonObject.put("handinAlready","1");
        jsonObject.put("type","主观题");
        jsonObject.put("delayable","1");
        jsonObject.put("handinAmount","1");
        jsonObject.put("upload","/homework/student/1605603006322WechatIMG859.jpeg");
        jsonObject.put("ansUpload",null);
        jsonObject.put("conUpload",null);
        jsonObject.put("id","5fc75aaa5550ba213ad4ce86");
        MvcResult authResult = mockMvc.perform(post("/editTeacherHomework")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .content(jsonObject.toString())//请求的参数（可多个）
        ).andExpect(status().isOk()).andReturn();
        TeacherHomework homework = teacherHomeworkRepository.findByHomeworkId(1);
        assertNotNull(homework);
    }

    @Test
    public void addTeacherHomework() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("homeworkId","4");
        jsonObject.put("courseId","1");
        jsonObject.put("teacherId","Teacher");
        jsonObject.put("title","数学第二次迭代");
        jsonObject.put("startTime","1970-10-10 11:11:11");
        jsonObject.put("endTime","1970-10-10 11:11:11");
        jsonObject.put("range","F1803704");
        jsonObject.put("answer","答案");
        jsonObject.put("subject","一年级上数学");
        jsonObject.put("content","第二次迭代");
        jsonObject.put("syllabus",null);
        jsonObject.put("handinAlready","1");
        jsonObject.put("type","主观题");
        jsonObject.put("delayable","1");
        jsonObject.put("handinAmount","1");
        jsonObject.put("ansUpload",null);
        jsonObject.put("conUpload",null);
        MvcResult authResult = mockMvc.perform(post("/editTeacherHomework")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .content(jsonObject.toString())//请求的参数（可多个）
        ).andExpect(status().isOk()).andReturn();
        TeacherHomework homework = teacherHomeworkRepository.findByHomeworkId(1);
        assertNotNull(homework);
    }

    @Test
    public void deleteTeacherHomeworkAll() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("courseId","1");

        MvcResult authResult = mockMvc.perform(post("/deleteTeacherHomeworkAll")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .content(jsonObject.toString())//请求的参数（可多个）
        ).andExpect(status().is(400)).andReturn();
        List<TeacherHomework> homeworkList = teacherHomeworkRepository.findAllByCourseId(1);
        Assert.assertEquals(homeworkList.size(),1);
    }

    @Test
    public void deleteTeacherHomeworkOne() throws Exception {
        JSONObject jsonObject = new JSONObject();

        MvcResult authResult = mockMvc.perform(post("/deleteTeacherHomeworkOne")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .content(jsonObject.toString())//请求的参数（可多个）
        ).andExpect(status().is(400)).andReturn();
        TeacherHomework homework = teacherHomeworkRepository.findByHomeworkId(1);
        Assert.assertNull(homework);
    }

    @Test
    public void updateHandinAlready() throws Exception {
        MvcResult authResult = mockMvc.perform(post("/UpdateHandinAlready")//使用get方式来调用接口。
                .contentType(MediaType.APPLICATION_JSON_VALUE)//请求参数的类型
                .param("homeworkId", "4")//请求的参数（可多个）
        ).andExpect(status().isOk()).andReturn();
        String result = authResult.getResponse().getContentAsString();
        Assert.assertEquals(result,"1");
    }
}
