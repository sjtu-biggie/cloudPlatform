package com.CloudPlatform.dao;

import com.CloudPlatform.entity.TeacherHomework;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TeacherHomeworkDao {
    List<TeacherHomework> findAllByTeacherId(String teacherId);
    List<TeacherHomework> findAllOfCourse(int courseId);
    TeacherHomework findOne(int homeworkId);
    TeacherHomework editOne(TeacherHomework homework);
    int addOne(TeacherHomework homework);
    void updateHandinAlready(TeacherHomework homework);
    void deleteAll(int courseId);
    void deleteOne(int homeworkId);

    List<TeacherHomework> findAllByTeacherIdPage(String teacherId, Pageable p);

    List<TeacherHomework> findAllByCourseIdPage(int courseId, Pageable p);
}
