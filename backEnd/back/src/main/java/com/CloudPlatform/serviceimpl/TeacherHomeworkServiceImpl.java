package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.TeacherHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.service.TeacherHomeworkService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TeacherHomeworkServiceImpl implements TeacherHomeworkService {
    @Autowired
    private TeacherHomeworkDao teacher_homeworkDao;

    @Override
    public List<TeacherHomework> getHomeworkAll(String teacherId) {
        return teacher_homeworkDao.findAllByTeacherId(teacherId);
    }

    @Override
    public List<TeacherHomework> getTeacherHomeworkAll( int courseId){
        return teacher_homeworkDao.findAllOfCourse(courseId);
    }

    @Override
    public TeacherHomework getTeacherHomeworkOne(int homeworkId){
        return teacher_homeworkDao.findOne(homeworkId);
    }

    @Override
    public TeacherHomework editTeacherHomework(JSONObject object){
        String Id = object.getString("id");
        int homeworkId= object.getInteger("homeworkId");
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

        TeacherHomework hw = new TeacherHomework(homeworkId,courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,content,answer,Id);
        return teacher_homeworkDao.editOne(hw);
    }

    @Override
    public TeacherHomework addTeacherHomework(JSONObject object){
        String Id = object.getString("id");
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

        TeacherHomework hw = new TeacherHomework(courseId,teacherId,title,range,
                startTime,endTime,type,subject,handinAmount,content,answer,Id);
        return teacher_homeworkDao.editOne(hw);
    }

    @Override
    public void deleteTeacherHomeworkAll(int courseId){
        teacher_homeworkDao.deleteAll(courseId);
    }

    @Override
    public void deleteTeacherHomeworkOne(int homeworkId){
        teacher_homeworkDao.deleteOne(homeworkId);
    }

}
