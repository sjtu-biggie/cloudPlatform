package com.CloudPlatform.dao;

import com.CloudPlatform.entity.Teacher_Homework;
import java.util.List;

public interface Teacher_HomeworkDao {
    List<Teacher_Homework> findAll(String teacherId, String courseId);
    Teacher_Homework findOne(String teacherId, String courseId, String homeworkId);
    Teacher_Homework editOne(Teacher_Homework homework);
    Teacher_Homework addOne(Teacher_Homework homework);
    void deleteAll(String teacherId, String courseId);
    void deleteOne(String teacherId, String courseId, String homeworkId);
}
