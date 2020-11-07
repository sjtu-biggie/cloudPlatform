package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.TeacherHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
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
    public TeacherHomework editTeacherHomework(JSONObject object, String ansUpload, String conUpload){
        JSONObject teaHw = object.getObject("homework",JSONObject.class);
        String Id = teaHw.getString("id");
        int homeworkId= teaHw.getInteger("homeworkId");
        int courseId= teaHw.getInteger("courseId");
        String teacherId= teaHw.getString("teacherId");
        String title= teaHw.getString("title");
        String range= teaHw.getString("range");
        String content= teaHw.getString("content");
        String answer= teaHw.getString("answer");
        String subject= teaHw.getString("subject");
        String type= teaHw.getString("type");
        int handinAmount = teaHw.getInteger("handinAmount");
        Date startTime = teaHw.getDate("startTime");
        Date endTime = teaHw.getDate("endTime");

        TeacherHomework hw = new TeacherHomework(homeworkId,courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,content,answer,Id, conUpload, ansUpload);
        return teacherhomeworkDao.editOne(hw);
    }

    @Override
    public TeacherHomework addTeacherHomework(JSONObject object, String ansUpload, String conUpload){
        JSONObject teaHw = object.getObject("homework",JSONObject.class);
        String Id = teaHw.getString("id");
        int courseId= teaHw.getInteger("courseId");
        String teacherId= teaHw.getString("teacherId");
        String title= teaHw.getString("title");
        String range= teaHw.getString("range");
        String content= teaHw.getString("content");
        String answer= teaHw.getString("answer");
        String subject= teaHw.getString("subject");
        String type= teaHw.getString("type");
        int handinAmount = teaHw.getInteger("handinAmount");
        Date startTime = teaHw.getDate("startTime");
        Date endTime = teaHw.getDate("endTime");

        TeacherHomework hw = new TeacherHomework(courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,content,answer,Id, conUpload, ansUpload);
        return teacherhomeworkDao.editOne(hw);
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
    public String upload(MultipartFile file,String userId){
        String pathName = "/homework/"+userId+"/";//想要存储文件的地址
        String pname = file.getOriginalFilename();//获取文件名（包括后缀）
        FileOutputStream fos = null;
        try {
            File ffile=new File(pathName);
            if(!ffile.exists()){//如果文件夹不存在
                ffile.mkdir();//创建文件夹
            }
            pathName+=System.currentTimeMillis();
            pathName += pname;
            fos = new FileOutputStream(pathName);
            fos.write(file.getBytes()); // 写入文件
            System.out.println("文件上传成功");
            return pathName;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
