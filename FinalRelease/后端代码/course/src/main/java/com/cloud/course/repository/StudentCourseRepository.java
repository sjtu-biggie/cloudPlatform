package com.cloud.course.repository;

import com.cloud.course.entity.Course;
import com.cloud.course.entity.StudentCourseInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public interface StudentCourseRepository extends CrudRepository<StudentCourseInfo,Integer> {

    @Query(nativeQuery = true,value="select * from student_course where course_id=?1")
    List<StudentCourseInfo> getCourseStudent(Integer courseId);
    @Query(nativeQuery = true,value="select count(*) from student_course where course_id=?1")
    int getCourseStudentNum(String courseId);
    @Transactional
    @Modifying
    @Query(nativeQuery = true,value="insert into student_course(user_id,course_id,grade,status,join_date,nickname,theClass,sid) values (?2,?1,0,0,?3,?4,?5,?6)")
    void register(String courseId, String userId,Date join_date,String nickname,String theClass,String sid);

    @Transactional
    @Modifying
    void deleteByCourseIdAndUserId(Integer courseId, String userId);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value="update student_course set grade = ?3 where course_id = ?1 and user_id = ?2")
    void updateCourseStudent(String courseId, String userId, String grade);
}
