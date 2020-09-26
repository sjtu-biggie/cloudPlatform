package com.CloudPlatform.repository;

import com.CloudPlatform.entity.Student_HomeworkDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel="Student_HomeworkDetail",path="Student_HomeworkDetail")
public interface Student_HomeworkDetailRepository extends MongoRepository<Student_HomeworkDetail, String>  {
    Student_HomeworkDetail findByStudentIdAndCourseIdAndHomeworkId(String studentId, String courseId, String homeworkId);
    List<Student_HomeworkDetail> findByStudentIdAndCourseId(String studentId, String courseId);
    List<Student_HomeworkDetail> findByCourseIdAndHomeworkId(String studentId, String HomeworkId);
    void deleteByStudentIdAndCourseIdAndHomeworkId(String studentId,String courseId,String homeworkId);
    void deleteByStudentIdAndCourseId(String studentId,String courseId);
}
