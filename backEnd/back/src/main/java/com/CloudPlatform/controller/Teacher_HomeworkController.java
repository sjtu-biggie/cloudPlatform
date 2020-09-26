package com.CloudPlatform.controller;
import com.CloudPlatform.entity.Student_Homework;
import com.CloudPlatform.entity.Teacher_Homework;
import com.CloudPlatform.service.Student_HomeworkService;
import com.CloudPlatform.service.Teacher_HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
public class Teacher_HomeworkController {
    @Autowired
    private Teacher_HomeworkService teacher_homeworkService;
    private Student_HomeworkService student_homeworkService;


    //获取该门课布置过的所有作业
    @RequestMapping(value = "/getTeacher_HomeworkAll")
    public List<Teacher_Homework> getTeacher_HomeworkAll(@RequestParam("teacherId") String teacherId, @RequestParam("courseId") String courseId) {
        System.out.println(teacherId+courseId);
        return teacher_homeworkService.getTeacher_HomeworkAll(teacherId, courseId);
    }

    //获取该门课某次作业
    @RequestMapping(value = "/getTeacher_HomeworkOne")
    public Teacher_Homework getTeacher_HomeworkOne(@RequestParam("teacherId") String teacherId, @RequestParam("courseId") String courseId, @RequestParam("homeworkId") String homeworkId) {
        return teacher_homeworkService.getTeacher_HomeworkOne(teacherId, courseId, homeworkId);
    }

    //获取课程某次所有学生提交的的作业
    @RequestMapping(value = "/getHomeworkOfStudents")
    public List<Student_Homework> getHomeworkOfStudents(@RequestParam("courseId") String courseId, @RequestParam("homeworkId") String homeworkId) {
        return student_homeworkService.getStudent_HomeworkAllOfHomework(courseId,homeworkId);
    }

    //批改同学提交的作业
    @RequestMapping(value = "/CorrectHomework")
    public @ResponseBody
    Student_Homework CorrectHomework(Student_Homework homework){
        return student_homeworkService.editStudent_Homework(homework);
    }

    //修改发布的作业
    @RequestMapping(value = "/editTeacher_Homework")
    public @ResponseBody
    Teacher_Homework editTeacher_Homework(Teacher_Homework homework){
        return teacher_homeworkService.editTeacher_Homework(homework);
    }

    //添加发布作业
    @RequestMapping(value = "/addTeacher_Homework")
    public @ResponseBody
    Teacher_Homework addTeacher_Homework(Teacher_Homework homework){
        return teacher_homeworkService.addTeacher_Homework(homework);
    }

    //删除课程的所有作业
    @RequestMapping(value = "/deleteTeacher_HomeworkAll")
    public @ResponseBody void deleteTeacher_HomeworkAll(@RequestParam("teacherId") String teacherId, @RequestParam("courseId") String courseId){
        teacher_homeworkService.deleteTeacher_HomeworkAll(teacherId, courseId);
    }

    //删除课程的某次作业
    @RequestMapping(value = "/deleteTeacher_HomeworkOne")
    public @ResponseBody void deleteTeacher_HomeworkOne(@RequestParam("teacherId") String teacherId, @RequestParam("courseId") String courseId, @RequestParam("homeworkId") String homeworkId){
        teacher_homeworkService.deleteTeacher_HomeworkOne(teacherId, courseId, homeworkId);
    }
}
