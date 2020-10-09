package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.StudentHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.service.StudentHomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentHomeworkServiceImpl implements StudentHomeworkService {
    @Autowired
    private StudentHomeworkDao student_homeworkDao;

    @Override
    public List<StudentHomework> getStudentHomeworkAll(String studentId) {
        return student_homeworkDao.findAll(studentId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfCourse(String studentId, int courseId){
        return student_homeworkDao.findAllOfCourse(studentId, courseId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomework(int homeworkId) {
        return student_homeworkDao.findAllOfHomework(homeworkId);
    }

    @Override
    public StudentHomework getStudentHomeworkOne(String studentId, int homeworkId){
        return student_homeworkDao.findOne(studentId, homeworkId);
    }

    @Override
    public StudentHomework editStudentHomework(StudentHomework homework){
        return student_homeworkDao.editOne(homework);
    }

    @Override
    public StudentHomework addStudentHomework(StudentHomework homework){
        return student_homeworkDao.addOne(homework);
    }

    @Override
    public void deleteStudentHomeworkAll(String studentId, int courseId){
        student_homeworkDao.deleteAll(studentId, courseId);
    }

    @Override
    public void deleteStudentHomeworkOne(String studentId, int homeworkId){
        student_homeworkDao.deleteOne(studentId, homeworkId);
    }

}
