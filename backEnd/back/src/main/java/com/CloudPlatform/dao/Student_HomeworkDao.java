package com.CloudPlatform.dao;

import com.CloudPlatform.entity.Student_Homework;

import java.util.List;

public interface Student_HomeworkDao {
    List<Student_Homework> findAll(String StudentId, String courseId);
    List<Student_Homework> findAllOfHomework(String courseId, String homeworkId);
    Student_Homework findOne(String  StudentId, String courseId, String homeworkId);
    Student_Homework editOne(Student_Homework homework);
    Student_Homework addOne(Student_Homework homework);
    void deleteAll(String StudentId, String courseId);
    void deleteOne(String StudentId, String courseId, String homeworkId);
}
