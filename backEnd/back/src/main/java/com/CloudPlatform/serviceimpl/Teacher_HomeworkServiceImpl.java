package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.Teacher_HomeworkDao;
import com.CloudPlatform.entity.Teacher_Homework;
import com.CloudPlatform.service.Teacher_HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Teacher_HomeworkServiceImpl implements Teacher_HomeworkService {
    @Autowired
    private Teacher_HomeworkDao teacher_homeworkDao;

    @Override
    public List<Teacher_Homework> getTeacher_HomeworkAll(String teacherId, String courseId){
        return teacher_homeworkDao.findAll(teacherId, courseId);
    }

    @Override
    public Teacher_Homework getTeacher_HomeworkOne(String teacherId, String courseId, String homeworkId){
        return teacher_homeworkDao.findOne(teacherId, courseId, homeworkId);
    }

    @Override
    public Teacher_Homework editTeacher_Homework(Teacher_Homework homework){
        return teacher_homeworkDao.editOne(homework);
    }

    @Override
    public Teacher_Homework addTeacher_Homework(Teacher_Homework homework){
        return teacher_homeworkDao.addOne(homework);
    }

    @Override
    public void deleteTeacher_HomeworkAll(String teacherId, String courseId){
        teacher_homeworkDao.deleteAll(teacherId, courseId);
    }

    @Override
    public void deleteTeacher_HomeworkOne(String teacherId, String courseId, String homeworkId){
        teacher_homeworkDao.deleteOne(teacherId, courseId, homeworkId);
    }

}
