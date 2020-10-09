package com.CloudPlatform.repository;

import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentHomeworkDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel="StudentHomeworkDetail",path="StudentHomeworkDetail")
public interface StudentHomeworkDetailRepository extends MongoRepository<StudentHomeworkDetail, String>  {
    List<StudentHomeworkDetail> findAll();
    List<StudentHomeworkDetail> findByStudentId(String studentId);
    List<StudentHomeworkDetail> findByHomeworkId(int homeworkId);
    List<StudentHomeworkDetail> findByStudentIdAndCourseId(String studentId, int courseId);
    StudentHomeworkDetail findByStudentIdAndHomeworkId(String studentId, int homeworkId);
    void deleteByStudentIdAndHomeworkId(String studentId,int homeworkId);
    void deleteByStudentIdAndCourseId(String studentId, int courseId);
}
