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

    //获取所有课课布置过的所有作业
    @RequestMapping(value = "/getHomeworkAll")
    public List<TeacherHomework> getHomeworkAll(@RequestParam("teacherId") String teacherId) {
        return teacherhomeworkService.getHomeworkAll(teacherId);
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
