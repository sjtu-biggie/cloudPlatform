package com.CloudPlatform.repository;

import com.CloudPlatform.entity.TeacherHomework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherHomeworkRepository extends JpaRepository<TeacherHomework,String> {
    List<TeacherHomework> findAll();
    List<TeacherHomework> findByCourseId(int courseId);
    TeacherHomework findByHomeworkId(int homeworkId);
    void deleteByCourseId(int courseId);
    void deleteByHomeworkId(int homeworkId);
}
