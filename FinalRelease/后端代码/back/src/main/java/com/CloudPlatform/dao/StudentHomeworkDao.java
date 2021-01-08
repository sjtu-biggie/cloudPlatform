package com.CloudPlatform.dao;

import com.CloudPlatform.entity.StudentHomework;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudentHomeworkDao {
    List<StudentHomework> findAll(String studentId);
    List<StudentHomework> findAllOfCourse(String studentId, int courseId);
    List<StudentHomework> findAllOfHomework(int homeworkId);
    List<StudentHomework> findAllOfHomeworkNoMongo(int homeworkId);
    StudentHomework findOne(String studentId, int homeworkId);
    StudentHomework editOne(StudentHomework homework);
    StudentHomework editOneByTeacher(StudentHomework homework);
    StudentHomework addOne(StudentHomework homework);
    void deleteAll(String studentId, int courseId);
    void deleteOne(String studentId, int homeworkId);
    Integer getStudentHomeworkRank(String studentId,int homeworkId);
    Integer getStudentHandinRank(String studentId,int homeworkId);
    Integer getCourseHomeworkNum(int courseId);
    Integer getStudentHomeworkNum(String studentId,int courseId);

    List<StudentHomework> findByHomeworkId(int homeworkId, Pageable p);

    List<StudentHomework> findAllPage(String studentId, Pageable p);

    List<StudentHomework> findAllOfHomeworkNoMongoPage(int homeworkId, Pageable p);
}
