package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.Student_HomeworkDao;
import com.CloudPlatform.entity.Student_Homework;
import com.CloudPlatform.service.Student_HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Student_HomeworkServiceImpl implements Student_HomeworkService {
    @Autowired
    private Student_HomeworkDao student_homeworkDao;

    @Override
    public List<Student_Homework> getStudent_HomeworkAll(String StudentId, String courseId){
        return student_homeworkDao.findAll(StudentId, courseId);
    }

    @Override
    public List<Student_Homework> getStudent_HomeworkAllOfHomework(String courseId, String homeworkId) {
        return student_homeworkDao.findAllOfHomework(courseId, homeworkId);
    }

    @Override
    public Student_Homework getStudent_HomeworkOne(String StudentId, String courseId, String homeworkId){
        return student_homeworkDao.findOne(StudentId, courseId, homeworkId);
    }

    @Override
    public Student_Homework editStudent_Homework(Student_Homework homework){
        return student_homeworkDao.editOne(homework);
    }

    @Override
    public Student_Homework addStudent_Homework(Student_Homework homework){
        return student_homeworkDao.addOne(homework);
    }

    @Override
    public void deleteStudent_HomeworkAll(String StudentId, String courseId){
        student_homeworkDao.deleteAll(StudentId, courseId);
    }

    @Override
    public void deleteStudent_HomeworkOne(String StudentId, String courseId, String homeworkId){
        student_homeworkDao.deleteOne(StudentId, courseId, homeworkId);
    }

}
