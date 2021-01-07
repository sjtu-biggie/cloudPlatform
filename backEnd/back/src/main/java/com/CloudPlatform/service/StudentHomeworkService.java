package com.CloudPlatform.service;

import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@Service
public interface StudentHomeworkService {
    List<StudentHomework> getStudentHomeworkAll(String studentId);
    List<StudentHomework> getStudentMistakenHomework(String studentId);
    List<StudentHomework> getStudentHomeworkAllOfCourse(String studentId, int courseId);
    List<StudentHomework> getStudentHomeworkAllOfHomework(int homeworkId);
    List<StudentHomework> getStudentHomeworkAllOfHomeworkNoMongo(int homeworkId);
    StudentHomework getStudentHomeworkOne(String studentId, int homeworkId) throws IOException;
    StudentHomework editStudentHomework(JSONObject object);
    StudentHomework editStudentHomeworkByTeacher(JSONObject object);
    StudentHomework addStudentHomework(JSONObject object);
    StudentHomework correctStudentHomework(JSONObject object);
    void deleteStudentHomeworkAll(String studentId, int courseId);
    void deleteStudentHomeworkOne(String studentId, int homeworkId);

    StudentStat getStudentStatistics(String studentId, int courseId,int time);

    List<StudentHomework> getStudentHomeworkAllOfHomeworkPage(int homeworkId, Pageable p);

    double getAverage(int homeworkId);

    String upload(MultipartFile file,String userId) throws IOException;

    void autoGrading(int homeworkId);

    List<StudentHomework> getStudentHomeworkAllPage(String studentId, Pageable p);

    List<StudentHomework> getPageHomeworkOfStudentsNoMongo(int homeworkId, Pageable p);
}
