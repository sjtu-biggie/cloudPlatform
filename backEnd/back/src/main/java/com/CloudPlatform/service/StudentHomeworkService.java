package com.CloudPlatform.service;

import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentHomeworkService {
    List<StudentHomework> getStudentHomeworkAll(String studentId);
    List<StudentHomework> getStudentHomeworkAllOfCourse(String studentId, int courseId);
    List<StudentHomework> getStudentHomeworkAllOfHomework(int homeworkId);
    List<StudentHomework> getStudentHomeworkAllOfHomeworkNoMongo(int homeworkId);
    StudentHomework getStudentHomeworkOne(String studentId, int homeworkId);
    StudentHomework editStudentHomework(StudentHomework homework);
    StudentHomework addStudentHomework(StudentHomework homework);
    void deleteStudentHomeworkAll(String studentId, int courseId);
    void deleteStudentHomeworkOne(String studentId, int homeworkId);

    StudentStat getStudentStatistics(String studentId, int courseId,int time);

    List<StudentHomework> getStudentHomeworkAllOfHomeworkPage(int homeworkId, Pageable p);

    double getAverage(int homeworkId);
}
