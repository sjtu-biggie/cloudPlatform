package com.cloud.course.dao;


import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.CourseInfo;
import com.cloud.course.entity.CoursePic;

import java.util.List;

public interface CourseDao {
    WholeCourse getCourseById(String id);
    List<WholeCourse> getCoursesByTeacher(String teacher_id);
    void deleteById(String id);

    void save(Course course);

    void saveInfo(CourseInfo courseInfo);

    List<CourseBulletin> getBulletin(String id);

    void savePic(CoursePic coursePic);
}
