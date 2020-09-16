package com.cloud.course.dao.daoImpl;

import com.cloud.course.dao.CourseDao;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseInfo;
import com.cloud.course.entity.CoursePic;
import com.cloud.course.repository.CourseBulletinRepository;
import com.cloud.course.repository.CourseInfoRepository;
import com.cloud.course.repository.CoursePicRepository;
import com.cloud.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
    public Course getCourseById(String id){
        return courseRepository.findAllById(id);
    }

    @Override
    public List<Course> getCoursesByTeacher(String teacher_id){
        return courseRepository.findAllByTeacher(teacher_id);
    }
    @Override
    public void deleteById(String id){
        courseRepository.deleteById(id);
    }

    @Override
    public void save(Course course){
        courseRepository.save(course);
        String pic = course.getPic();
        String id = course.getId();
        CoursePic coursePic = new CoursePic(id,pic);
        System.out.println();
        coursePicRepository.save(coursePic);
    }

    @Override
    public void saveInfo(CourseInfo courseInfo){
        courseInfoRepository.save(courseInfo);
    }

}
