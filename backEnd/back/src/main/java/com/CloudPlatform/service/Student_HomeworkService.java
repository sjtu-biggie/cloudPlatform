package com.CloudPlatform.service;

import com.CloudPlatform.entity.Student_Homework;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface Student_HomeworkService {
    List<Student_Homework> getStudent_HomeworkAll(String studentId, String courseId);
    List<Student_Homework> getStudent_HomeworkAllOfHomework(String courseId, String homeworkId);
    Student_Homework getStudent_HomeworkOne(String studentId, String courseId, String homeworkId);
    Student_Homework editStudent_Homework(Student_Homework homework);
    Student_Homework addStudent_Homework(Student_Homework homework);
    void deleteStudent_HomeworkAll(String studentId, String courseId);
    void deleteStudent_HomeworkOne(String studentId, String courseId, String homeworkId);
}
