package com.CloudPlatform.controller;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.CloudPlatform.service.StudentHomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class StudentHomeworkController {
    @Autowired
    private StudentHomeworkService studenthomeworkService;

    //同学所有提交的作业
    @RequestMapping(value = "/getStudentHomeworkAll")
    public List<StudentHomework> getStudentHomeworkAll(@RequestParam("studentId") String studentId) {
        return studenthomeworkService.getStudentHomeworkAll(studentId);
    }

    //同学课程的所有提交的作业
    @RequestMapping(value = "/getStudentHomeworkAllOfCourse")
    public List<StudentHomework> getStudentHomeworkAllOfCourse(@RequestParam("studentId") String studentId, @RequestParam("courseId") int courseId) {
        return studenthomeworkService.getStudentHomeworkAllOfCourse(studentId, courseId);
    }

    //同学课程的某次提交的作业
    @RequestMapping(value = "/getStudentHomeworkOne")
    public StudentHomework getStudentHomeworkOne(@RequestParam("studentId") String studentId,
                                                 @RequestParam("homeworkId") int homeworkId) {
        return studenthomeworkService.getStudentHomeworkOne(studentId, homeworkId);
    }


    //批改同学提交的作业
    @RequestMapping(value = "/CorrectHomework")
    public @ResponseBody
    StudentHomework CorrectHomework(StudentHomework homework){
        return studenthomeworkService.editStudentHomework(homework);
    }

    //获取课程某次所有学生提交的的作业
    @RequestMapping(value = "/getHomeworkOfStudents")
    public List<StudentHomework> getHomeworkOfStudents(@RequestParam("homeworkId") int homeworkId) {
        return studenthomeworkService.getStudentHomeworkAllOfHomework(homeworkId);
    }

    //分页获取课程某次所有学生提交的的作业
    @RequestMapping(value = "/getPageHomeworkOfStudents")
    public List<StudentHomework> getPageHomeworkOfStudents(@RequestParam("homeworkId") int homeworkId,@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        return studenthomeworkService.getStudentHomeworkAllOfHomeworkPage(homeworkId,p);
    }

    //获取课程某次所有学生提交的的作业没有mongo
    @RequestMapping(value = "/getHomeworkOfStudentsNoMongo")
    public List<StudentHomework> getHomeworkOfStudentsNoMongo(@RequestParam("homeworkId") int homeworkId) {
        return studenthomeworkService.getStudentHomeworkAllOfHomeworkNoMongo(homeworkId);
    }

    //编辑作业
    @RequestMapping(value = "/editStudentHomework")
    public @ResponseBody
    StudentHomework editStudentHomework(StudentHomework homework){
        return studenthomeworkService.editStudentHomework(homework);
    }

    //提交作业
    @RequestMapping(value = "/addStudentHomework")
    public @ResponseBody
    StudentHomework addStudentHomework(StudentHomework homework){
        return studenthomeworkService.addStudentHomework(homework);
    }

    //删除某课程的所有作业
    @RequestMapping(value = "/deleteStudentHomeworkAll")
    public @ResponseBody void deleteStudentHomeworkAll(@RequestParam("studentId") String studentId, @RequestParam("courseId") int courseId){
        studenthomeworkService.deleteStudentHomeworkAll(studentId, courseId);
    }

    //删除课程的某次作业
    @RequestMapping(value = "/deleteStudentHomeworkOne")
    public @ResponseBody void deleteStudentHomeworkOne(@RequestParam("studentId") String studentId, @RequestParam("homeworkId") int homeworkId){
        studenthomeworkService.deleteStudentHomeworkOne(studentId, homeworkId);
    }
    //获取学生在课程中的所有信息
    @RequestMapping(value = "/getStudentStatistics")
    public @ResponseBody
    StudentStat getStudentStatistics(@RequestParam("studentId") String studentId, @RequestParam("courseId") int courseId, @RequestParam("times") int times){
        return studenthomeworkService.getStudentStatistics(studentId, courseId,times);
    }

}
