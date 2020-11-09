package com.CloudPlatform.repository;

import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.TeacherHomework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public interface TeacherHomeworkRepository extends JpaRepository<TeacherHomework,String> {
    List<TeacherHomework> findAllByTeacherId(String teacherId);
    List<TeacherHomework> findAllByCourseId(int courseId);
    TeacherHomework findByHomeworkId(int homeworkId);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value ="insert into teacherhomework (endtime, handinamount, `range`, starttime, subject, title, type, courseid, teacherid, homeworkid) values (?1, ?2,?3, ?4, ?5, ?6,?7, ?8, ?9,?10)")
    void Insert(Date endTime, int handinamount, String range, Date starttime, String subject, String title, String type, int courseid, String teacherid, int homeworkid);

    @Query(nativeQuery = true,value = "select max(homeworkId) from teacherhomework ")
    Integer getMaxId();


    @Transactional
    void deleteByCourseId(int courseId);
    @Transactional
    void deleteByHomeworkId(int homeworkId);
}
