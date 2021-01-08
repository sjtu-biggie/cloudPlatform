package com.CloudPlatform.repository;

import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.entity.TeacherHomeworkDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.transaction.Transactional;
import java.util.List;

@RepositoryRestResource(collectionResourceRel="TeacherHomeworkDetail",path="TeacherHomeworkDetail")
public interface TeacherHomeworkDetailRepository extends MongoRepository<TeacherHomeworkDetail, String>  {
    List<TeacherHomeworkDetail> findAllByTeacherId(String teacherId);
    List<TeacherHomeworkDetail> findAllByCourseId(String courseId);
    TeacherHomeworkDetail findByHomeworkId(String homeworkId);
    @Transactional
    void deleteByHomeworkId(String homeworkId);
    @Transactional
    void deleteByCourseId(String courseId);
}
