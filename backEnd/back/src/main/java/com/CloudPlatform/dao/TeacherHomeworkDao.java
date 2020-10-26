package com.CloudPlatform.dao;

import com.CloudPlatform.entity.TeacherHomework;
import java.util.List;

public interface TeacherHomeworkDao {
    List<TeacherHomework> findAllByTeacherId(String teacherId);
    List<TeacherHomework> findAllOfCourse(int courseId);
    TeacherHomework findOne(int homeworkId);
    TeacherHomework editOne(TeacherHomework homework);
    TeacherHomework addOne(TeacherHomework homework);
    void deleteAll(int courseId);
    void deleteOne(int homeworkId);
}
