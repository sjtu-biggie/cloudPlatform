package com.cloud.course.service;


import com.alibaba.fastjson.JSONObject;
import com.cloud.course.entity.Course;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CourseService {

    Course getCourseById(String id);

    List<Course> getCoursesByTeacher(String id);

    void deleteById(String id);

    void addcourse(JSONObject object);
}
