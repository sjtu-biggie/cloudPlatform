package com.CloudPlatform.service;

import com.CloudPlatform.entity.Teacher_Homework;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface Teacher_HomeworkService {
    List<Teacher_Homework> getTeacher_HomeworkAll(String teacherId, String courseId);
    Teacher_Homework getTeacher_HomeworkOne(String teacherId, String courseId, String homeworkId);
    Teacher_Homework editTeacher_Homework(Teacher_Homework homework);
    Teacher_Homework addTeacher_Homework(Teacher_Homework homework);
    void deleteTeacher_HomeworkAll(String teacherId, String courseId);
    void deleteTeacher_HomeworkOne(String teacherId, String courseId, String homeworkId);
}
