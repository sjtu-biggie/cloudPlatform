package com.CloudPlatform.service;

import com.CloudPlatform.entity.TeacherHomework;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeacherHomeworkService {
    List<TeacherHomework> getHomeworkAll(String teacherId);
    List<TeacherHomework> getTeacherHomeworkAll(int courseId);
    TeacherHomework getTeacherHomeworkOne(int homeworkId);
    TeacherHomework editTeacherHomework(JSONObject object);
    TeacherHomework addTeacherHomework(JSONObject object);
    void deleteTeacherHomeworkAll(int courseId);
    void deleteTeacherHomeworkOne(int homeworkId);
}
