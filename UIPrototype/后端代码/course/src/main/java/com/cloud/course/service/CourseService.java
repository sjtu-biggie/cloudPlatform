package com.cloud.course.service;


import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.Notification;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CourseService {

    WholeCourse getCourseById(String id);

    List<WholeCourse> getCoursesByTeacher(String id);

    void deleteById(String id);

    void addcourse(JSONObject object);

    List<CourseBulletin> getBulletin(String id);

    void addBulletin(JSONObject object);

    void deleteBulletin(String id);

    List<WholeCourse> getCourseByStudent(String id);

    List<Notification> getNoteByUser(String id);

    void addNote(JSONObject object);

    void deleteNote(String id);

    void register(JSONObject object);
}
