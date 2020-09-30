package com.cloud.course.dao.daoImpl;

import com.cloud.course.dao.CourseDao;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.*;
import com.cloud.course.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.parseInt;


@Repository
public class CourseDaoImpl implements CourseDao {

    @Autowired
    private CourseInfoRepository courseInfoRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CoursePicRepository coursePicRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CourseBulletinRepository courseBulletinRepository;

    @Override
    public WholeCourse getCourseById(String id){
        Course course = courseRepository.findAllById(id);
        if(course==null){
            System.out.println("course nonexist in getCoursesById");
            return null;
        }
        if(course.getId()==null){
            return null;
        }
        CoursePic coursePic = coursePicRepository.findAllById(course.getId());
        CourseInfo courseInfo = courseInfoRepository.findAllById(course.getId());
        return new WholeCourse(course,courseInfo,coursePic);
    }

    @Override
    public List<WholeCourse> getCoursesByTeacher(String teacher_id){
        List<Course> courseList = courseRepository.findAllByTeacher(teacher_id);
        List<WholeCourse> wholeCourseList = new ArrayList<>();
        for (Course course:courseList){
            if(course.getId()==null){
                System.out.println("course Id nonexist in getCoursesByTeacher");
                continue;
            }
            CoursePic  coursePic = coursePicRepository.findAllById(course.getId());
            CourseInfo courseInfo = courseInfoRepository.findAllById(course.getId());
            WholeCourse wholeCourse = new WholeCourse(course,courseInfo,coursePic);
            wholeCourseList.add(wholeCourse);
        }
        return wholeCourseList;
    }
    @Override
    public void deleteById(String id){
        courseRepository.deleteById(id);
    }

    @Override
    public void save(Course course){
        courseRepository.save(course);
    }

    @Override
    public void saveInfo(CourseInfo courseInfo){
        courseInfoRepository.save(courseInfo);
    }

    @Override
    public List<CourseBulletin> getBulletin(String id){
        return courseBulletinRepository.findAllById(id);
    }
    @Override
    public void savePic(CoursePic coursePic){
        coursePicRepository.save(coursePic);
    }

    @Override
    public void saveBulletin(CourseBulletin courseBulletin){
        courseBulletinRepository.save(courseBulletin);
    }

    @Override
    public  CourseBulletin getBulletin(String id, Date publish_date){
        return courseBulletinRepository.findByIdAndPublishDate(id,publish_date);
    }
    @Override
    public void deleteBulletin(CourseBulletin courseBulletin){
        courseBulletinRepository.delete(courseBulletin);
    }

    @Override
    public List<Course> getCoursesByStudent(String id){
        return courseRepository.getCoursesByStudent(id);
    }
    @Override
    public List<Notification> getNoteByUser(String id){
        return noteRepository.findAllByReceiverId(id);
    }
    @Override
    public List<Notification> getNoteByTeacher(String id){
        return noteRepository.findAllBySenderId(id);
    }

    @Override
    public void saveNote(Notification notification){
        noteRepository.save(notification);
    }
    @Override
    public void deleteNote(String id){
        noteRepository.deleteByNotificationId(parseInt(id));
    }
}
