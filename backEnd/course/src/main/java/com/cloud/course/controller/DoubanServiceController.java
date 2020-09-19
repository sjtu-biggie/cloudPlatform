package com.cloud.course.controller;


import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class DoubanServiceController {
    @Autowired
    private CourseService courseService;


    @GetMapping(path = "/course/getCourseById")
    public WholeCourse getCourseById(@RequestParam("courseId") String id) {
        return courseService.getCourseById(id);
    }

    @GetMapping(path = "/course/getCoursesByTeacher")
    public List<WholeCourse> getCoursesByTeacher(@RequestParam("userId") String id) {
        return courseService.getCoursesByTeacher(id);
    }

    @GetMapping(path = "/course/getBulletin")
    public List<CourseBulletin> getBulletin(@RequestParam("userId") String id) {
        return courseService.getBulletin(id);
    }
    @PostMapping(path = "/course/getBulletin")
    public void addBulletin(@RequestBody JSONObject object) {
        System.out.println("bulletin added");
        courseService.addBulletin(object);
    }

    @PostMapping(path = "/course/deleteCourse")
    public void deleteCourse(@RequestBody Map<String, String> params) {
        String id = params.get("courseId");
        courseService.deleteById(id);
    }

    @PostMapping(path = "/course/addCourse")
    //note that the modification will also come into this controller
    public void addCourse(@RequestBody JSONObject object) {
        System.out.println("course added");
        courseService.addcourse(object);
    }
}
