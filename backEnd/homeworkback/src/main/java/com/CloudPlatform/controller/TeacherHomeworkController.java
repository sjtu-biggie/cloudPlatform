package com.CloudPlatform.controller;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.service.StudentHomeworkService;
import com.CloudPlatform.service.TeacherHomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
public class TeacherHomeworkController {
    @Autowired
    private TeacherHomeworkService teacherhomeworkService;
    private StudentHomeworkService studenthomeworkService;

    //获取所有课课布置过的所有作业
    @RequestMapping(value = "/getHomeworkAll")
    public List<TeacherHomework> getHomeworkAll() {
        return teacherhomeworkService.getHomeworkAll();
    }

    //获取该门课布置过的所有作业
    @RequestMapping(value = "/getTeacherHomeworkAll")
    public List<TeacherHomework> getTeacherHomeworkAll(@RequestParam("courseId") int courseId) {
        return teacherhomeworkService.getTeacherHomeworkAll(courseId);
    }

    //获取该门课某次作业
    @RequestMapping(value = "/getTeacherHomeworkOne")
    public TeacherHomework getTeacherHomeworkOne(@RequestParam("homeworkId") int homeworkId) {
        return teacherhomeworkService.getTeacherHomeworkOne(homeworkId);
    }

    //获取课程某次所有学生提交的的作业
    @RequestMapping(value = "/getHomeworkOfStudents")
    public List<StudentHomework> getHomeworkOfStudents(@RequestParam("homeworkId") int homeworkId) {
        return studenthomeworkService.getStudentHomeworkAllOfHomework(homeworkId);
    }

    //批改同学提交的作业
    @RequestMapping(value = "/CorrectHomework")
    public @ResponseBody
    StudentHomework CorrectHomework(StudentHomework homework){
        return studenthomeworkService.editStudentHomework(homework);
    }

    //修改发布的作业
    @RequestMapping(value = "/editTeacherHomework")
    public @ResponseBody
    TeacherHomework editTeacherHomework(TeacherHomework homework){
        return teacherhomeworkService.editTeacherHomework(homework);
    }

    //添加发布作业
    @RequestMapping(value = "/addTeacherHomework")
    public @ResponseBody
    TeacherHomework addTeacherHomework(TeacherHomework homework){
        return teacherhomeworkService.addTeacherHomework(homework);
    }

    //删除课程的所有作业
    @RequestMapping(value = "/deleteTeacherHomeworkAll")
    public @ResponseBody void deleteTeacherHomeworkAll(@RequestParam("courseId") int courseId){
        teacherhomeworkService.deleteTeacherHomeworkAll(courseId);
    }

    //删除课程的某次作业
    @RequestMapping(value = "/deleteTeacherHomeworkOne")
    public @ResponseBody void deleteTeacherHomeworkOne(@RequestParam("homeworkId") int homeworkId){
        teacherhomeworkService.deleteTeacherHomeworkOne(homeworkId);
    }
}
