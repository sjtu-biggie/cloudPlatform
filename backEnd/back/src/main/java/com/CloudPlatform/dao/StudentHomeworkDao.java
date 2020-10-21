package com.CloudPlatform.dao;

import com.CloudPlatform.entity.StudentHomework;

import java.util.List;

public interface StudentHomeworkDao {
    List<StudentHomework> findAll(String studentId);
    List<StudentHomework> findAllOfCourse(String studentId, int courseId);
    List<StudentHomework> findAllOfHomework(int homeworkId);
    StudentHomework findOne(String studentId, int homeworkId);
    StudentHomework editOne(StudentHomework homework);
    StudentHomework addOne(StudentHomework homework);
    void deleteAll(String studentId, int courseId);
    void deleteOne(String studentId, int homeworkId);
    Integer getStudentHomeworkRank(String studentId,int homeworkId);
    Integer getCourseHomeworkNum(int courseId);
    Integer getStudentHomeworkNum(String studentId,int courseId);

}
