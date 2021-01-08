package com.CloudPlatform.service;

import com.CloudPlatform.entity.TeacherHomework;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface TeacherHomeworkService {
    List<TeacherHomework> getHomeworkAll(String teacherId);
    List<TeacherHomework> getTeacherHomeworkAll(int courseId);
    TeacherHomework getTeacherHomeworkOne(int homeworkId);
    TeacherHomework editTeacherHomework(JSONObject object);
    int addTeacherHomework(JSONObject object);
    void deleteTeacherHomeworkAll(int courseId);
    void deleteTeacherHomeworkOne(int homeworkId);
    int UpdateHandinAlready(int homeworkId);

    List<TeacherHomework> getHomeworkAllPage(String teacherId, Pageable p);

    List<TeacherHomework> getTeacherHomeworkAllPage(int courseId, Pageable p);

    int UpdateAnspost(int homeworkId);
}
