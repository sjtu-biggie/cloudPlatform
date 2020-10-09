package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.TeacherHomeworkDao;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.service.TeacherHomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherHomeworkServiceImpl implements TeacherHomeworkService {
    @Autowired
    private TeacherHomeworkDao teacher_homeworkDao;

    @Override
    public List<TeacherHomework> getHomeworkAll() {
        return teacher_homeworkDao.findAll();
    }

    @Override
    public List<TeacherHomework> getTeacherHomeworkAll( int courseId){
        return teacher_homeworkDao.findAllOfCourse(courseId);
    }

    @Override
    public TeacherHomework getTeacherHomeworkOne(int homeworkId){
        return teacher_homeworkDao.findOne(homeworkId);
    }

    @Override
    public TeacherHomework editTeacherHomework(TeacherHomework homework){
        return teacher_homeworkDao.editOne(homework);
    }

    @Override
    public TeacherHomework addTeacherHomework(TeacherHomework homework){
        return teacher_homeworkDao.addOne(homework);
    }

    @Override
    public void deleteTeacherHomeworkAll(int courseId){
        teacher_homeworkDao.deleteAll(courseId);
    }

    @Override
    public void deleteTeacherHomeworkOne(int homeworkId){
        teacher_homeworkDao.deleteOne(homeworkId);
    }

}
