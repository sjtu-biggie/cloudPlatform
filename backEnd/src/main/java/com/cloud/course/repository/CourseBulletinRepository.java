package com.cloud.course.repository;

import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.CoursePic;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseBulletinRepository extends MongoRepository<CourseBulletin,String> {

}
