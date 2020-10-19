package com.cloud.course.service.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dao.CourseDao;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.*;
import com.cloud.course.service.CourseService;
import com.fasterxml.jackson.annotation.JsonAlias;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static java.lang.Boolean.parseBoolean;
import static java.lang.Integer.parseInt;


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
        boolean noteHomeworkAssign = parseBoolean(object.getString("noteHomeworkAssign"));
        boolean noteHomeworkDue = parseBoolean(object.getString("noteHomeworkDue"));
        boolean noteHomeworkRatify = parseBoolean(object.getString("noteHomeworkRatify"));
        boolean seeCourseAverage = parseBoolean(object.getString("seeCourseAverage"));
        boolean seeHomeworkAverage = parseBoolean(object.getString("seeHomeworkAverage"));
        String introduction = object.getString("introduction");
        JSONObject syllabus = object.getJSONObject("syllabus");
        String textbook = object.getString("textbook");
        String detail = object.getString("detail");
        String classes = object.getString("classes");
        String type = object.getString("type");
        String grade = object.getString("grade");
        String modify = object.getString("modify");
        Course course = new Course(userId,name,start_date,end_date,type,grade,classes,noteHomeworkAssign,noteHomeworkDue,noteHomeworkRatify,seeCourseAverage,seeHomeworkAverage);
        CourseInfo courseInfo = new CourseInfo(courseDao.findMaxId(),detail,introduction,syllabus,textbook);
        if(modify!=null&&!modify.equals("")){
            int id = parseInt(object.getString("id"));
            course = new Course(id,userId,name,start_date,end_date,type,grade,classes,noteHomeworkAssign,noteHomeworkDue,noteHomeworkRatify,seeCourseAverage,seeHomeworkAverage);
        }
        courseDao.save(course);
        courseDao.saveInfo(courseInfo);
    }
    @Override
    public Page<CourseBulletin> getPageBulletin(String id, Pageable p){
        int courseId = parseInt(id);
        return courseDao.getPageBulletin(courseId,p);
    }
    @Override
    public List<CourseBulletin> getBulletin(String id){
        int courseId = parseInt(id);
        return courseDao.getBulletin(courseId);
    }
    @Override
    public void addBulletin(JSONObject object){
        int courseId = parseInt(object.getString("courseId"));
        String title = object.getString("title");
        String content = object.getString("content");
        Date publish_date = new Date();
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String _publish_date = object.getString("publishDate");
        try {
            publish_date = sdf.parse(_publish_date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        CourseBulletin courseBulletin=new CourseBulletin(courseId,title,content,publish_date);
        courseDao.saveBulletin(courseBulletin);
    }
    @Override
    public List<WholeCourse> getAllCourses(Pageable p){
        return courseDao.getPageCourses(p);
    }
    @Override
    public void addNote(JSONObject object){
        String recId = object.getString("receiverId");
        String sendId= object.getString("senderId");
        String title= object.getString("title");
        String content= object.getString("content");
        Date publish_date = new Date();
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String _publish_date = object.getString("publishDate");
        try {
            publish_date = sdf.parse(_publish_date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Notification notification=new Notification(recId,sendId,title,publish_date,false,content);
        courseDao.saveNote(notification);
    }
    @Override
    public void deleteBulletin(String id){
        int bulletinId = parseInt(id);
        CourseBulletin courseBulletin = courseDao.getOneBulletin(bulletinId);
        courseDao.deleteBulletin(courseBulletin);
    }
    @Override
    public List<WholeCourse> getCourseByStudent(String id){
        return courseDao.getCoursesByStudent(id);
    }

    @Override
    public List<Notification> getNoteByUser(String id){
        return courseDao.getNoteByUser(id);
    }
    @Override
    public void deleteNote(String id){
        courseDao.deleteNote(id);
    }

    @Override
    public void register(JSONObject object){
        String courseId = object.getString("courseId");
        JSONArray studentId = object.getJSONArray("studentId");
        Date join_date = new Date();
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String _join_date = object.getString("joinDate");
        try {
            join_date = sdf.parse(_join_date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        for(int i=0;i<studentId.size();++i){
            courseDao.register(courseId,studentId.getString(i),join_date);
        }
    }
}
