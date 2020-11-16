package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.TeacherHomeworkDao;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.service.TeacherHomeworkService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class TeacherHomeworkServiceImpl implements TeacherHomeworkService {
    @Autowired
    private TeacherHomeworkDao teacherhomeworkDao;

    @Override
    public List<TeacherHomework> getHomeworkAll(String teacherId) {
        return teacherhomeworkDao.findAllByTeacherId(teacherId);
    }

    @Override
    public List<TeacherHomework> getTeacherHomeworkAll( int courseId){
        return teacherhomeworkDao.findAllOfCourse(courseId);
    }

    @Override
    public TeacherHomework getTeacherHomeworkOne(int homeworkId){
        return teacherhomeworkDao.findOne(homeworkId);
    }

    @Override
    public TeacherHomework editTeacherHomework(JSONObject object){
        String Id = object.getString("id");
        String type= object.getString("type");
        int homeworkId= object.getInteger("homeworkId");
        int courseId= object.getInteger("courseId");
        String teacherId= object.getString("teacherId");
        String title= object.getString("title");
        String range= object.getString("range");
        JSONObject syllabus;
        if(type.equals("客观题")){
            syllabus = object.getJSONObject("syllabus");
        }else{
            syllabus = null;
        }
        String content= object.getString("content");
        String answer= object.getString("answer");
        String subject= object.getString("subject");
        int handinAmount = object.getInteger("handinAmount");
        int handinAlready = object.getInteger("handinAlready");
        int Delayable = object.getInteger("Delayable");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");
        String conUpload= object.getString("conUpload");
        String ansUpload= object.getString("ansUpload");

        TeacherHomework hw = new TeacherHomework(homeworkId,courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,handinAlready,Delayable,content,syllabus,answer,Id, conUpload, ansUpload);
        return teacherhomeworkDao.editOne(hw);
    }

    @Override
    public int addTeacherHomework(JSONObject object){
        int courseId= object.getInteger("courseId");
        String teacherId= object.getString("teacherId");
        String title= object.getString("title");
        String range= object.getString("range");
        String content= object.getString("content");
        String answer= object.getString("answer");
        String subject= object.getString("subject");
        String type= object.getString("type");
        int handinAmount = object.getInteger("handinAmount");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");
        String conUpload= object.getString("conUpload");
        String ansUpload= object.getString("ansUpload");
        JSONObject syllabus;
        if(type.equals("客观题")){
            syllabus = object.getJSONObject("syllabus");
        }else{
            syllabus = null;
        }
        TeacherHomework hw = new TeacherHomework(courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,0,1,content,syllabus,answer, conUpload, ansUpload);
        return teacherhomeworkDao.addOne(hw);
    }

    @Override
    public void deleteTeacherHomeworkAll(int courseId){
        teacherhomeworkDao.deleteAll(courseId);
    }

    @Override
    public void deleteTeacherHomeworkOne(int homeworkId){
        teacherhomeworkDao.deleteOne(homeworkId);
    }

    @Override
    public int UpdateHandinAlready(int homeworkId) {
        TeacherHomework teaHw = teacherhomeworkDao.findOne(homeworkId);
        int num = teaHw.getHandinAlready() + 1;
        teaHw.setHandinAlready(num);
        teacherhomeworkDao.updateHandinAlready(teaHw);
        return num;
    }

}