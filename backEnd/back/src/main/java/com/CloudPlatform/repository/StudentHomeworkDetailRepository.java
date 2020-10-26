package com.CloudPlatform.repository;

import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentHomeworkDetail;
import com.CloudPlatform.utils.multikeys.StudentHomeworkMultiKeys;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.transaction.Transactional;
import java.util.List;

public interface StudentHomeworkDetailRepository extends MongoRepository<StudentHomeworkDetail, String>  {
    List<StudentHomeworkDetail> findAll();
    List<StudentHomeworkDetail> findAllByStudentId(String studentId);
    List<StudentHomeworkDetail> findAllByHomeworkId(String homeworkId);
    List<StudentHomeworkDetail> findAllByStudentIdAndCourseId(String studentId, String courseId);
    StudentHomeworkDetail findByStudentIdAndHomeworkId(String studentId, String homeworkId);
    Page<StudentHomeworkDetail> findAllByHomeworkId(int homeworkId, Pageable pageable);

    @Transactional
    void deleteByStudentIdAndHomeworkId(String studentId,String homeworkId);

    @Transactional
    void deleteByStudentIdAndCourseId(String studentId, String courseId);
}
