package com.CloudPlatform.controller;
import com.CloudPlatform.entity.Student_Homework;
import com.CloudPlatform.service.Student_HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class Student_HomeworkController {
    @Autowired
    private Student_HomeworkService student_homeworkService;

    //同学课程的所有提交的作业
    @RequestMapping(value = "/getStudent_HomeworkAll")
    public List<Student_Homework> getStudent_HomeworkAll(@RequestParam("studentId") String studentId, @RequestParam("courseId") String courseId) {
        return student_homeworkService.getStudent_HomeworkAll(studentId, courseId);
    }

    //同学课程的某次提交的作业
    @RequestMapping(value = "/getStudent_HomeworkOne")
    public Student_Homework getStudent_HomeworkOne(@RequestParam("studentId") String studentId, @RequestParam("courseId") String courseId, @RequestParam("homeworkId") String homeworkId) {
        return student_homeworkService.getStudent_HomeworkOne(studentId, courseId, homeworkId);
    }

    //编辑作业
    @RequestMapping(value = "/editStudent_Homework")
    public @ResponseBody
    Student_Homework editStudent_Homework(Student_Homework homework){
        return student_homeworkService.editStudent_Homework(homework);
    }

    //提交作业
    @RequestMapping(value = "/addStudent_Homework")
    public @ResponseBody
    Student_Homework addStudent_Homework(Student_Homework homework){
        return student_homeworkService.addStudent_Homework(homework);
    }

    //删除某课程的所有作业
    @RequestMapping(value = "/deleteStudent_HomeworkAll")
    public @ResponseBody void deleteStudent_HomeworkAll(@RequestParam("studentId") String studentId, @RequestParam("courseId") String courseId){
        student_homeworkService.deleteStudent_HomeworkAll(studentId, courseId);
    }

    //删除课程的某次作业
    @RequestMapping(value = "/deleteStudent_HomeworkOne")
    public @ResponseBody void deleteStudent_HomeworkOne(@RequestParam("studentId") String studentId, @RequestParam("courseId") String courseId, @RequestParam("homeworkId") String homeworkId){
        student_homeworkService.deleteStudent_HomeworkOne(studentId, courseId, homeworkId);
    }
}
