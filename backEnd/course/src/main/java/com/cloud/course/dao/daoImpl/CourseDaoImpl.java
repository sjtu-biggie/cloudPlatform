package com.cloud.course.dao.daoImpl;

import com.cloud.course.dao.CourseDao;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.*;
import com.cloud.course.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        int courseId = parseInt(id);
        Course course = courseRepository.findAllById(courseId);
        if(course==null){
            System.out.println("course nonexist in getCoursesById");
            return null;
        }
//        CoursePic coursePic = coursePicRepository.findAllById(course.getId());
        CourseInfo courseInfo = courseInfoRepository.findAllById(course.getId());
        return new WholeCourse(course,courseInfo,null);
    }

    @Override
    public List<WholeCourse> getCoursesByTeacher(String teacher_id){
        List<Course> courseList = courseRepository.findAllByTeacher(teacher_id);
        List<WholeCourse> wholeCourseList = new ArrayList<>();
        for (Course course:courseList){
//            if(course.getId()==null){
//                System.out.println("course Id nonexist in getCoursesByTeacher");
//                continue;
//            }
//            CoursePic  coursePic = coursePicRepository.findAllById(course.getId());
            CourseInfo courseInfo = courseInfoRepository.findAllById(course.getId());
            WholeCourse wholeCourse = new WholeCourse(course,courseInfo,null);
            wholeCourseList.add(wholeCourse);
        }
        return wholeCourseList;
    }
    @Override
    public void deleteById(String id){
        int courseId = parseInt(id);
        courseRepository.deleteById(courseId);
    }
    @Override
    public int findMaxId(){
        return courseRepository.findMaxId();
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
    public List<CourseBulletin> getBulletin(int id){
        return courseBulletinRepository.findAllByCourseId(id);
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
    public  CourseBulletin getOneBulletin(int bulletinId){
        return courseBulletinRepository.findCourseBulletinByBulletinId(bulletinId);
    }
    @Override
    public void deleteBulletin(CourseBulletin courseBulletin){
        courseBulletinRepository.delete(courseBulletin);
    }

    @Override
    public List<WholeCourse> getPageCourses(Pageable p){
        Page<Course> coursesPages = courseRepository.findAll(p);
        List<WholeCourse> wholeCourseList= new ArrayList<>();
        for(int i=0;i<coursesPages.getContent().size();++i){
            WholeCourse wholeCourse=new WholeCourse();
            wholeCourse.setCourse(coursesPages.getContent().get(i));
            wholeCourse.setCourseInfo(courseInfoRepository.findAllById(coursesPages.getContent().get(i).getId()));
            wholeCourseList.add(wholeCourse);
        }
        return wholeCourseList;
    }
    @Override
    public List<WholeCourse> getCoursesByStudent(String id){
        List<Course> courseList = courseRepository.getCoursesByStudent(id);
        List<WholeCourse> wholeCourseList = new ArrayList<>();
        for (Course course:courseList){
//            if(course.getId()==null){
//                System.out.println("course Id nonexist in getCoursesByTeacher");
//                continue;
//            }
//            CoursePic  coursePic = coursePicRepository.findAllById(course.getId());
            CourseInfo courseInfo = courseInfoRepository.findAllById(course.getId());
            WholeCourse wholeCourse = new WholeCourse(course,courseInfo,null);
            wholeCourseList.add(wholeCourse);
        }
        return wholeCourseList;
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

    @Override
    public void register(String courseId, String userId,Date join_date){
        courseRepository.register(courseId,userId,join_date);
    }
    @Override
    public Page<CourseBulletin> getPageBulletin(int courseId, Pageable p){
        return courseBulletinRepository.findAllByCourseId(courseId,p);
    }
}
