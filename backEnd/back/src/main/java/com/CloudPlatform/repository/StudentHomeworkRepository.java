package com.CloudPlatform.repository;

import com.CloudPlatform.entity.StudentHomework;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface StudentHomeworkRepository extends JpaRepository<StudentHomework,String> {
    List<StudentHomework> findByStudentId(String studentId);
    List<StudentHomework> findByHomeworkId(int homeworkId);
    List<StudentHomework> findByStudentIdAndCourseId(String studentId, int courseId);
    StudentHomework findByStudentIdAndHomeworkId(String studentId, int homeworkId);
    @Transactional
    void deleteByStudentIdAndHomeworkId(String studentId,int homeworkId);
    @Transactional
    void deleteByStudentIdAndCourseId(String studentId, int courseId);
}
