package com.cloud.course.dao.daoImpl;

import com.cloud.course.dao.CourseDao;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.CourseInfo;
import com.cloud.course.entity.CoursePic;
import com.cloud.course.repository.CourseBulletinRepository;
import com.cloud.course.repository.CourseInfoRepository;
import com.cloud.course.repository.CoursePicRepository;
import com.cloud.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Repository
public class CourseDaoImpl implements CourseDao {

    @Autowired
    private CourseInfoRepository courseInfoRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CoursePicRepository coursePicRepository;

    @Autowired
    private CourseBulletinRepository courseBulletinRepository;

    @Override
    public WholeCourse getCourseById(String id){
        Course course = courseRepository.findAllById(id);
        CoursePic coursePic = coursePicRepository.findAllById(course.getId());
        CourseInfo courseInfo = courseInfoRepository.findAllById(course.getId());
        return new WholeCourse(course,courseInfo,coursePic);
    }

    @Override
    public List<WholeCourse> getCoursesByTeacher(String teacher_id){
        List<Course> courseList = courseRepository.findAllByTeacher(teacher_id);
        List<WholeCourse> wholeCourseList = new ArrayList<>();
        for (Course course:courseList){
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
}
