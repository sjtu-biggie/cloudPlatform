package com.cloud.course.repository;

import com.cloud.course.entity.CourseInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseInfoRepository extends MongoRepository<CourseInfo,String> {

    void deleteById(String id);
}
