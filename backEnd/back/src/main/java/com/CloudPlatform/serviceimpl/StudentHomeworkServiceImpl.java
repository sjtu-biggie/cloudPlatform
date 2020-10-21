package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.StudentHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.CloudPlatform.service.StudentHomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.Double.parseDouble;

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
    @Override
    public StudentStat getStudentStatistics(String studentId, int courseId){
        int finishHomework= student_homeworkDao.getStudentHomeworkNum(studentId,courseId);
        int courseHomeworkNum = student_homeworkDao.getCourseHomeworkNum(courseId);
        int failedHomework = courseHomeworkNum-finishHomework;
        List<StudentHomework> studentHomeworkList = student_homeworkDao.findAll(studentId);
        float meanScore=0;
        for (StudentHomework studentHomework : studentHomeworkList){
            if(studentHomework.getScore()==-1) studentHomework.setScore(parseDouble("0"));
            meanScore +=studentHomework.getScore();
        }
        meanScore = meanScore / courseHomeworkNum;
        return null;
    }
}
