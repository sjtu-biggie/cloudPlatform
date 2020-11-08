package com.CloudPlatform.service;

import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface StudentHomeworkService {
    List<StudentHomework> getStudentHomeworkAll(String studentId);
    List<StudentHomework> getStudentHomeworkAllOfCourse(String studentId, int courseId);
    List<StudentHomework> getStudentHomeworkAllOfHomework(int homeworkId);
    List<StudentHomework> getStudentHomeworkAllOfHomeworkNoMongo(int homeworkId);
    StudentHomework getStudentHomeworkOne(String studentId, int homeworkId);
    StudentHomework editStudentHomework(JSONObject object,String upload);
    StudentHomework addStudentHomework(JSONObject object,String upload);
    StudentHomework correctStudentHomework(JSONObject object);
    void deleteStudentHomeworkAll(String studentId, int courseId);
    void deleteStudentHomeworkOne(String studentId, int homeworkId);

    StudentStat getStudentStatistics(String studentId, int courseId,int time);

    List<StudentHomework> getStudentHomeworkAllOfHomeworkPage(int homeworkId, Pageable p);

    double getAverage(int homeworkId);

    String upload(MultipartFile file,String userId);

    String uploadNotSave(MultipartFile file);
}
