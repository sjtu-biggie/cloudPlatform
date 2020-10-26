package com.CloudPlatform.service;

import com.CloudPlatform.entity.TeacherHomework;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeacherHomeworkService {
    List<TeacherHomework> getHomeworkAll(String teacherId);
    List<TeacherHomework> getTeacherHomeworkAll(int courseId);
    TeacherHomework getTeacherHomeworkOne(int homeworkId);
    TeacherHomework editTeacherHomework(TeacherHomework homework);
    TeacherHomework addTeacherHomework(TeacherHomework homework);
    void deleteTeacherHomeworkAll(int courseId);
    void deleteTeacherHomeworkOne(int homeworkId);
}
