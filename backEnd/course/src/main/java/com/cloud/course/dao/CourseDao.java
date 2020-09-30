package com.cloud.course.dao;


import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.*;

import java.util.Date;
import java.util.List;

public interface CourseDao {
    WholeCourse getCourseById(String id);
    List<WholeCourse> getCoursesByTeacher(String teacher_id);
    void deleteById(String id);

    void save(Course course);

    void saveInfo(CourseInfo courseInfo);

    List<CourseBulletin> getBulletin(String id);

    void savePic(CoursePic coursePic);

    void saveBulletin(CourseBulletin courseBulletin);

    CourseBulletin getBulletin(String id, Date publish_date);

    void deleteBulletin(CourseBulletin courseBulletin);

    List<Course> getCoursesByStudent(String id);

    List<Notification> getNoteByUser(String id);

    List<Notification> getNoteByTeacher(String id);

    void saveNote(Notification notification);

    void deleteNote(String id);
}
