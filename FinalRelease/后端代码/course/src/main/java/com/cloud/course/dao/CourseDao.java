package com.cloud.course.dao;


import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface CourseDao {
    WholeCourse getCourseById(String id);
    int findMaxId();
    List<WholeCourse> getCoursesByTeacher(String teacher_id, Pageable p);
    void deleteById(String id);

    void save(Course course);

    void saveInfo(CourseInfo courseInfo);

    List<CourseBulletin> getBulletin(int id);

    void savePic(CoursePic coursePic);

    void saveBulletin(CourseBulletin courseBulletin);

    CourseBulletin getOneBulletin(int bulletinId);

    void deleteBulletin(CourseBulletin courseBulletin);

    List<WholeCourse> getCoursesByStudent(String id, Pageable p);

    List<Notification> getNoteByUser(String id);

    List<Notification> getNoteByTeacher(String id);

    void saveNote(Notification notification);

    void deleteNote(String id);

    List<WholeCourse> getCoursesByTeacherN(String teacher_id);
    List<WholeCourse> getCoursesByStudentN(String student_id);

    void register(String courseId, String string,Date join_date,String nickname,String theClass,String sid);

    Page<CourseBulletin> getPageBulletin(int courseId, Pageable p);

    List<WholeCourse> getPageCourses(Pageable p);

    Notification getNoteById(String id);

    Integer getRank(String courseId, String userId);

    int getCourseStudentNum(String courseId);

    List<StudentCourseInfo> getCourseStudent(int courseId);

    void deleteCourseStudent(String courseId, String userId);

    void updateCourseStudent(String courseId, String userId, String grade);

    List<WholeCourse> getAllCourses();

    List<WholeCourse> getStudentEndCourses(String student_id);

    List<WholeCourse> getTeacherEndCourses(String teacher_id);

    int findCount();
}
