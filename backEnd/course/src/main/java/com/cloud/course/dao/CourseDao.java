package com.cloud.course.dao;


import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseInfo;

import java.util.List;

public interface CourseDao {
    Course getCourseById(String id);
    List<Course> getCoursesByTeacher(String teacher_id);
    void deleteById(String id);

    void save(Course course);

    void saveInfo(CourseInfo courseInfo);
}
