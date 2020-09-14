package com.cloud.course.repository;

import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseInfo;
import org.springframework.data.repository.CrudRepository;

public interface CourseInfoRepository extends CrudRepository<CourseInfo,String> {

}
