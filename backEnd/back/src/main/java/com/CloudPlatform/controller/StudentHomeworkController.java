package com.CloudPlatform.controller;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.CloudPlatform.service.StudentHomeworkService;
import com.alibaba.fastjson.JSONObject;
import com.aliyuncs.exceptions.ClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;
import com.CloudPlatform.config.PicOssUrl;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
public class StudentHomeworkController {
    @Autowired
    private StudentHomeworkService studenthomeworkService;

    //同学所有的错题
    @RequestMapping(value = "/getMistakenHomework")
    public List<StudentHomework> getMistakenHomework(@RequestParam("studentId") String studentId) {
        return studenthomeworkService.getStudentMistakenHomework(studentId);
    }

    //同学所有提交的作业
    @RequestMapping(value = "/getStudentHomeworkAll")
    public List<StudentHomework> getStudentHomeworkAll(@RequestParam("studentId") String studentId) {
        return studenthomeworkService.getStudentHomeworkAll(studentId);
    }

    //分页获取同学所有提交的作业
    @RequestMapping(value = "/getPageStudentHomeworkAll")
    public List<StudentHomework> getPageStudentHomeworkAll(@RequestParam("studentId") String studentId,@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        return studenthomeworkService.getStudentHomeworkAllPage(studentId,p);
    }

    //自动批改
    @RequestMapping(value = "/autoGrading")
    public void autoGrading (@RequestParam("homeworkId") int homeworkId) {
        studenthomeworkService.autoGrading(homeworkId);
    }

    //同学课程的所有提交的作业
    @RequestMapping(value = "/getStudentHomeworkAllOfCourse")
    public List<StudentHomework> getStudentHomeworkAllOfCourse(@RequestParam("studentId") String studentId, @RequestParam("courseId") int courseId) {
        return studenthomeworkService.getStudentHomeworkAllOfCourse(studentId, courseId);
    }

    //同学课程的某次提交的作业
    @RequestMapping(value = "/getStudentHomeworkOne")
    public StudentHomework getStudentHomeworkOne(@RequestParam("studentId") String studentId,
                                                 @RequestParam("homeworkId") int homeworkId) throws IOException {
        return studenthomeworkService.getStudentHomeworkOne(studentId, homeworkId);
    }

    @PostMapping(value = "/upload")
    public List<String> upload(@RequestParam("file") MultipartFile file, @RequestParam("userId") String userId) throws IOException, ClientException {
        String path = studenthomeworkService.upload(file,userId);
        List<String> res = new ArrayList<>();
        res.add(path);
        if (path != null){
            String Sharpness = PicOssUrl.testUploadFile(path);
            res.add(Sharpness);
        }
        return res;
    }


    //批改同学提交的作业
    @RequestMapping(value = "/CorrectHomework")
    public @ResponseBody
    StudentHomework CorrectHomework(@RequestBody JSONObject object){
        return studenthomeworkService.correctStudentHomework(object);
    }

    @InitBinder
    public void initBinder(WebDataBinder binder, WebRequest request) {
        //转换日期
        DateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));// CustomDateEditor为自定义日期编辑器
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

    //分页获取课程某次所有学生提交的的作业没有mongo
    @RequestMapping(value = "/getPageHomeworkOfStudentsNoMongo")
    public List<StudentHomework> getPageHomeworkOfStudentsNoMongo(@RequestParam("homeworkId") int homeworkId, @RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        return studenthomeworkService.getPageHomeworkOfStudentsNoMongo(homeworkId,p);
    }

    //编辑作业
    @RequestMapping(value = "/editStudentHomework")
    public @ResponseBody
    StudentHomework editStudentHomework(@RequestBody JSONObject object){
        return studenthomeworkService.editStudentHomework(object);
    }

    //老师编辑作业
    @RequestMapping(value = "/editStudentHomeworkByTeacher")
    public @ResponseBody
    StudentHomework editStudentHomeworkByTeacher(@RequestBody JSONObject object){
        return studenthomeworkService.editStudentHomeworkByTeacher(object);
    }

    //提交作业
    @RequestMapping(value = "/addStudentHomework")
    public @ResponseBody
    StudentHomework addStudentHomework(@RequestBody JSONObject object){
        return studenthomeworkService.addStudentHomework(object);
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

    //获取当前平均分
    @RequestMapping(value = "/getAverage")
    public @ResponseBody
    double getStudentStatistics(@RequestParam("homeworkId") int homeworkId){
        return studenthomeworkService.getAverage(homeworkId);
    }

}
