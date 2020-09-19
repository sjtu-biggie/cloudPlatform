package com.cloud.course.repository;

import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.CoursePic;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseBulletinRepository extends MongoRepository<CourseBulletin,String> {
    List<CourseBulletin> findAllById(String id);
}
