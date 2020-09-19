package com.cloud.course.service.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dao.CourseDao;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseBulletin;
import com.cloud.course.entity.CourseInfo;
import com.cloud.course.entity.CoursePic;
import com.cloud.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;



@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDao courseDao;

    @Override
    public WholeCourse getCourseById(String id){

        return courseDao.getCourseById(id);
    }
    @Override
    public List<WholeCourse> getCoursesByTeacher(String id){
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
        String _start_date = object.getString("startDate");
        String _end_date = object.getString("endDate");
        Date start_date = new Date();
        Date end_date = new Date();
        //注意format的格式要与日期String的格式相匹配
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            start_date = sdf.parse(_start_date);
            end_date = sdf.parse(_end_date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String pic = object.getString("pic");
        String introduction = object.getString("introduction");
        String syllabus = object.getString("syllabus");
        String textbook = object.getString("textbook");
        Course course = new Course(courseId,userId,name,start_date,end_date);
        CoursePic coursePic = new CoursePic(courseId,pic);
        CourseInfo courseInfo = new CourseInfo(courseId,introduction,syllabus,textbook);
        courseDao.save(course);
        courseDao.saveInfo(courseInfo);
        courseDao.savePic(coursePic);
    }

    @Override
    public List<CourseBulletin> getBulletin(String id){
        return courseDao.getBulletin(id);
    }
    @Override
    public void addBulletin(JSONObject object){
        String id = object.getString("courseId");
        String bulletin = object.getString("bulletin");
        Date publish_date = new Date();
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String _publish_date = object.getString("publishDate");
        try {
            publish_date = sdf.parse(_publish_date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        CourseBulletin courseBulletin=new CourseBulletin(id,bulletin,publish_date);
        courseDao.saveBulletin(courseBulletin);
    }
    @Override
    public void deleteBulletin(String id, String publish_date){
        Date _publish_date = new Date();
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            _publish_date = sdf.parse(publish_date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(_publish_date);
        CourseBulletin courseBulletin = courseDao.getBulletin(id,_publish_date);
        courseDao.deleteBulletin(courseBulletin);
    }
}
