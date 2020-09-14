package com.cloud.course.service.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dao.CourseDao;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.CourseInfo;
import com.cloud.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;



@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDao courseDao;

    @Override
    public Course getCourseById(String id){

        return courseDao.getCourseById(id);
    }
    @Override
    public List<Course> getCoursesByTeacher(String id){
        return courseDao.getCoursesByTeacher(id);
    }
    @Override
    public void deleteById(String id){
        courseDao.deleteById(id);
    }
    @Override
    public void addcourse(JSONObject object){
        String courseId = object.getString("courseId");
        String name = object.getString("courseName");
        String userId = object.getString("userId");
        Date start_date = object.getDate("startDate");
        Date end_date = object.getDate("endDate");
        String pic = object.getString("pic");
        String introduction = object.getString("introduction");
        String syllabus = object.getString("syllabus");
        String textbook = object.getString("textbook");
        String assessment = object.getString("assessment");
        Course course = new Course(courseId,userId,name,start_date,end_date,pic);
        CourseInfo courseInfo = new CourseInfo(courseId,introduction,syllabus,textbook,assessment);
        courseDao.save(course);
        courseDao.saveInfo(courseInfo);
    }
}
