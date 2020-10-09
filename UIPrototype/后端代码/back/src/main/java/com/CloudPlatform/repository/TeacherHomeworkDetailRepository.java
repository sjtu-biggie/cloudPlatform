package com.CloudPlatform.repository;

import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.entity.TeacherHomeworkDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel="TeacherHomeworkDetail",path="TeacherHomeworkDetail")
public interface TeacherHomeworkDetailRepository extends MongoRepository<TeacherHomeworkDetail, String>  {
    List<TeacherHomeworkDetail> findAll();
    List<TeacherHomeworkDetail> findByCourseId(int courseId);
    TeacherHomeworkDetail findByHomeworkId(int homeworkId);
    void deleteByHomeworkId(int homeworkId);
    void deleteByCourseId(int courseId);
}
