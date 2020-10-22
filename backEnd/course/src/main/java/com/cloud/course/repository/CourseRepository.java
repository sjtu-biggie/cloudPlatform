package com.cloud.course.repository;

import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
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

    @Query(value = "from Course where userId=?1")
    List<Course> findAllByTeacher(String teacher_id);

    @Query(nativeQuery = true,value="select * from course where id in (select course_id from student_course where user_id = ?1)")
    List<Course> getCoursesByStudent(String id);

    @Query(nativeQuery = true,value="select id from course where id >= all (select id from course)")
    int findMaxId();

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value="insert into student_course(user_id,course_id,grade,status,join_date,nickname,theClass,sid) values (?2,?1,0,0,?3,?4,?5,?6)")
    void register(String courseId, String userId,Date join_date,String nickname,String theClass,String sid);


    Page<Course> findAll(Pageable p);

    @Query(nativeQuery = true,value="select count(*) from student_course where grade >= (select grade from student_course where user_id=?2 and course_id=?1) and course_id=?1")
    Integer getRank(String courseId, String userId);

    @Query(nativeQuery = true,value="select count(*) from student_course where course_id=?1")
    int getCourseStudentNum(String courseId);
}
