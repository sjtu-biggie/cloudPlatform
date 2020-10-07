package com.cloud.course.repository;

import com.cloud.course.entity.CoursePic;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CoursePicRepository extends MongoRepository<CoursePic,Integer> {
    CoursePic findAllById(int id);
}
