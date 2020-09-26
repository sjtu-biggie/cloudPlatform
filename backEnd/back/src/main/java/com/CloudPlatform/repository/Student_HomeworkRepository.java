package com.CloudPlatform.repository;

import com.CloudPlatform.entity.Student_Homework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Student_HomeworkRepository extends JpaRepository<Student_Homework,String> {
    List<Student_Homework> findByStudentIdAndCourseId(String studentId, String courseId);
    List<Student_Homework> findByCourseIdAndHomeworkId(String courseId, String HomeworkId);
    Student_Homework findByStudentIdAndCourseIdAndHomeworkId(String studentId, String courseId, String homeworkId);
    void deleteByStudentIdAndCourseIdAndHomeworkId(String studentId,String courseId,String homeworkId);
    void deleteByStudentIdAndCourseId(String studentId,String courseId);
}
