package com.cloud.course.repository;

import com.cloud.course.entity.Course;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public interface CourseRepository extends CrudRepository<Course,Integer> {
    Course findAllById(int id);

    @Transactional
    @Modifying
    void deleteById(int id);

    @Query(value = "from Course where userId=?1")
    List<Course> findAllByTeacher(String teacher_id);

    @Query(nativeQuery = true,value="select * from course where id in (select course_id from student_course where user_id = ?1)")
    List<Course> getCoursesByStudent(String id);

    @Query(nativeQuery = true,value="select id from course where id >= all (select id from course)")
    int findMaxId();

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value="insert into student_course(user_id,course_id,grade,status,join_date) values (?2,?1,0,0,?3)")
    void register(String courseId, String userId,Date join_date);
}
