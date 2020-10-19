package com.CloudPlatform.repository;

import com.CloudPlatform.entity.TeacherHomework;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface TeacherHomeworkRepository extends JpaRepository<TeacherHomework,String> {
    List<TeacherHomework> findAll();
    List<TeacherHomework> findAllByCourseId(int courseId);
    TeacherHomework findByHomeworkId(int homeworkId);
    @Transactional
    void deleteByCourseId(int courseId);
    @Transactional
    void deleteByHomeworkId(int homeworkId);
}
