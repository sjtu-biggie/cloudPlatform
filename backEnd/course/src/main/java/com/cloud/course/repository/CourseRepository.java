package com.cloud.course.repository;

import com.cloud.course.entity.Course;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CourseRepository extends CrudRepository<Course,String> {
    Course findAllById(String id);

    @Transactional
    @Modifying
    void deleteById(String id);

    @Query(value = "from Course where teacher=?1")
    List<Course> findAllByTeacher(String teacher_id);

    @Query(nativeQuery = true,value="select * from course where id in (select course_id from student_course where user_id = ?1)")
    List<Course> getCoursesByStudent(String id);
}
