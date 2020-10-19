package com.cloud.course.controller;


import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.Notification;
import com.cloud.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping(path = "/course/getCourses")
    public List<WholeCourse> getAllCourses(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        return courseService.getAllCourses(p);
    }

    @GetMapping(path = "/course/getCourseById")
    public WholeCourse getCourseById(@RequestParam("courseId") String id) {
        return courseService.getCourseById(id);
    }

    @GetMapping(path = "/course/getCoursesByTeacher")
    public List<WholeCourse> getCoursesByTeacher(@RequestParam("userId") String id,@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        return courseService.getCoursesByTeacher(id,p);
    }
    @GetMapping(path = "/course/getCoursesByUser")
    //note that the modification will also come into this controller
    public List<WholeCourse> getCoursesByStudent(@RequestParam("userId") String id,@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        System.out.println("getCourseByStudent");
        return courseService.getCourseByStudent(id,p);
    }
    @GetMapping(path = "/course/getNoteByUser")
    //note that the modification will also come into this controller
    public List<Notification>getNoteByUser(@RequestParam("userId") String id) {
        System.out.println("getNoteByUser");
        return courseService.getNoteByUser(id);
    }
    @GetMapping(path = "/course/getNoteById")
    //note that the modification will also come into this controller
    public Notification getNoteById(@RequestParam("notificationId") String id) {
        System.out.println("getNoteByUser");
        return courseService.getNoteById(id);
    }
    @PostMapping(path = "/course/addNote")
    public void addNote(@RequestBody JSONObject object) {
        System.out.println("note added");
        courseService.addNote(object);
    }
    @PostMapping(path = "/course/deleteNote")
    public void deleteNote(@RequestBody Map<String, String> params) {
        System.out.println("note deleted");
        String id = params.get("notificationId");
        courseService.deleteNote(id);
    }

    @GetMapping(path = "/course/getPageBulletin")
//    @PreAuthorize("hasRole('ROLE_USER')")
    public Page<CourseBulletin> getPageBulletins(@RequestParam("courseId") String id, @RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        System.out.println("********** getWeibos **********");
        return courseService.getPageBulletin(id,p);
    }

    @GetMapping(path = "/course/getBulletin")
    public List<CourseBulletin> getBulletin(@RequestParam("courseId") String id) {
        return courseService.getBulletin(id);
    }

    @PostMapping(path = "/course/deleteBulletin")
    public void deleteBulletin(@RequestBody Map<String, String> params) {
        System.out.println("bulletin delete");
        String id = params.get("bulletinId");
        courseService.deleteBulletin(id);
    }
    @PostMapping(path = "/course/addBulletin")
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

    @PostMapping(path = "/course/register")
    //note that the modification will also come into this controller
    public void register(@RequestBody JSONObject object) {
        System.out.println("register student");
        courseService.register(object);
    }
}
