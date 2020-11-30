package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.TeacherHomeworkDao;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.service.TeacherHomeworkService;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
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
        TeacherHomework teacherHomework = teacherhomeworkDao.findOne(homeworkId);
        if (teacherHomework.getContentUpload() != null){
            String[] path = teacherHomework.getContentUpload().split(",");
            List fileList = new ArrayList<>();
            File file = null;
            for (String filepath : path) {
                try {
                    file = ResourceUtils.getFile(filepath);
                    // 获取文件输入流
                    FileInputStream inputStream = new FileInputStream(file);
                    byte[] buffer=new byte[inputStream.available()];
                    inputStream.read(buffer);
                    fileList.add(new Base64().encodeToString(buffer));
                } catch (FileNotFoundException e) {
                    System.out.println("文件不存在！");
                } catch (IOException e) {
                    System.out.println("文件读取异常！");
                }
            }
            teacherHomework.setContentFile(fileList);
        }

        if (teacherHomework.getAnswerUpload() != null){
            String[] path = teacherHomework.getAnswerUpload().split(",");
            List fileList = new ArrayList<>();
            File file = null;
            for (String filepath : path) {
                try {
                    file = ResourceUtils.getFile(filepath);
                    // 获取文件输入流
                    FileInputStream inputStream = new FileInputStream(file);
                    byte[] buffer=new byte[inputStream.available()];
                    inputStream.read(buffer);
                    fileList.add(new Base64().encodeToString(buffer));
                } catch (FileNotFoundException e) {
                    System.out.println("文件不存在！");
                } catch (IOException e) {
                    System.out.println("文件读取异常！");
                }
            }
            teacherHomework.setAnswerFile(fileList);
        }
        return teacherHomework;
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
        int delayable = object.getInteger("delayable");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");
        String conUpload= object.getString("conUpload");
        String ansUpload= object.getString("ansUpload");

        TeacherHomework hw = new TeacherHomework(homeworkId,courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,handinAlready,delayable,content,syllabus,answer,Id, conUpload, ansUpload);
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
        int delayable= object.getInteger("delayable");
        JSONObject syllabus;
        if(type.equals("客观题")){
            syllabus = object.getJSONObject("syllabus");
        }else{
            syllabus = null;
        }
        TeacherHomework hw = new TeacherHomework(courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,0,delayable,content,syllabus,answer, conUpload, ansUpload);
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
