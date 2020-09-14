package com.cloud.course.repository;

import com.cloud.course.entity.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseBulletinRepository extends CrudRepository<Course,String> {

}
