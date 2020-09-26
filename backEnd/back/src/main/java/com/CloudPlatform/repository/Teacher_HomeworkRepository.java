package com.CloudPlatform.repository;

import com.CloudPlatform.entity.Teacher_Homework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Teacher_HomeworkRepository extends JpaRepository<Teacher_Homework,String> {
    List<Teacher_Homework> findByTeacherIdAndCourseId(String teacherId, String courseId);
    Teacher_Homework findByTeacherIdAndCourseIdAndHomeworkId(String teacherId, String courseId, String homeworkId);
    void deleteByTeacherIdAndCourseIdAndHomeworkId(String teacherId,String courseId,String homeworkId);
    void deleteByTeacherIdAndCourseId(String teacherId,String courseId);
}
