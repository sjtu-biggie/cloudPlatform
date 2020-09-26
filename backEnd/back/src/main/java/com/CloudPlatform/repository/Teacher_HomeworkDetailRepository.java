package com.CloudPlatform.repository;

import com.CloudPlatform.entity.Teacher_Homework;
import com.CloudPlatform.entity.Teacher_HomeworkDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel="Teacher_HomeworkDetail",path="Teacher_HomeworkDetail")
public interface Teacher_HomeworkDetailRepository extends MongoRepository<Teacher_HomeworkDetail, String>  {
    Teacher_HomeworkDetail findByTeacherIdAndCourseIdAndHomeworkId(String teacherId, String courseId, String homeworkId);
    List<Teacher_HomeworkDetail> findByTeacherIdAndCourseId(String teacherId, String courseId);
    void deleteByTeacherIdAndCourseIdAndHomeworkId(String teacherId,String courseId,String homeworkId);
    void deleteByTeacherIdAndCourseId(String teacherId,String courseId);
}
