package com.cloud.course.repository;

import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.StudentCourseInfo;
import com.cloud.course.entity.StudentCourseStat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(nativeQuery = true,value = "select * from course where user_id=?1 and end_date > CURRENT_TIME ")
    List<Course> findAllByTeacher(String teacher_id);

    @Query(nativeQuery = true,value="select * from course where end_date > CURRENT_TIME and id in (select course_id from student_course where user_id = ?1)")
    List<Course> getCoursesByStudent(String id);

    @Query(nativeQuery = true,value="select id from course where id >= all (select id from course)")
    int findMaxId();


    Page<Course> findAll(Pageable p);

    @Query(nativeQuery = true,value="select count(*) from student_course where grade >= (select grade from student_course where user_id=?2 and course_id=?1) and course_id=?1")
    Integer getRank(String courseId, String userId);

    List<Course> findAll();

    @Query(nativeQuery = true,value="select * from course where end_date <= CURRENT_TIME and id in (select course_id from student_course where user_id = ?1)")
    List<Course> getStudentEndCourses(String student_id);

    @Query(nativeQuery = true,value = "select * from course where user_id=?1 and end_date <= CURRENT_TIME ")
    List<Course> getTeacherEndCourses(String teacher_id);
}
