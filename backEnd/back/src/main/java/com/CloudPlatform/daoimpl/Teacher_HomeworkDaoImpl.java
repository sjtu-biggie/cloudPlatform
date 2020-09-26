package com.CloudPlatform.daoimpl;

import com.CloudPlatform.dao.Teacher_HomeworkDao;
import com.CloudPlatform.entity.Teacher_Homework;
import com.CloudPlatform.entity.Teacher_HomeworkDetail;
import com.CloudPlatform.repository.Teacher_HomeworkDetailRepository;
import com.CloudPlatform.repository.Teacher_HomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Teacher_HomeworkDaoImpl implements Teacher_HomeworkDao {
    private Teacher_HomeworkRepository teacher_homeworkRepository;
    private Teacher_HomeworkDetailRepository teacher_homeworkDetailRepository;

    @Autowired
    public Teacher_HomeworkDaoImpl(Teacher_HomeworkRepository teacher_homeworkRepository, Teacher_HomeworkDetailRepository teacher_homeworkDetailRepository){
        this.teacher_homeworkRepository = teacher_homeworkRepository;
        this.teacher_homeworkDetailRepository = teacher_homeworkDetailRepository;
    }

    @Override
    public Teacher_Homework editOne(Teacher_Homework homework){
        Teacher_HomeworkDetail homeworkDetail = new Teacher_HomeworkDetail();
        String c_id = homework.getCourseId();
        String t_id = homework.getTeacherId();
        String h_id = homework.getHomeworkId();
        homeworkDetail.setCourseId(c_id);
        homeworkDetail.setTeacherId(t_id);
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        teacher_homeworkDetailRepository.save(homeworkDetail);
        return teacher_homeworkRepository.save(homework);
    }

    @Override
    public Teacher_Homework addOne(Teacher_Homework homework){
        teacher_homeworkRepository.save(homework);
        Teacher_HomeworkDetail homeworkDetail = new Teacher_HomeworkDetail();
        String c_id = homework.getCourseId();
        String t_id = homework.getTeacherId();
        String h_id = homework.getHomeworkId();
        homeworkDetail.setCourseId(c_id);
        homeworkDetail.setTeacherId(t_id);
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        teacher_homeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public void deleteAll(String teacherId, String courseId) {
        teacher_homeworkRepository.deleteByTeacherIdAndCourseId(teacherId,courseId);
        teacher_homeworkDetailRepository.deleteByTeacherIdAndCourseId(teacherId,courseId);
    }

    @Override
    public void deleteOne(String teacherId, String courseId, String homeworkId) {
        teacher_homeworkRepository.deleteByTeacherIdAndCourseIdAndHomeworkId(teacherId,courseId, homeworkId);
        teacher_homeworkDetailRepository.deleteByTeacherIdAndCourseIdAndHomeworkId(teacherId,courseId, homeworkId);
    }

    @Override
    public Teacher_Homework findOne(String teacherId, String courseId, String homeworkId){
        Teacher_Homework homework = teacher_homeworkRepository.findByTeacherIdAndCourseIdAndHomeworkId(teacherId, courseId, homeworkId);
        Teacher_HomeworkDetail detail =  teacher_homeworkDetailRepository.findByTeacherIdAndCourseIdAndHomeworkId(teacherId, courseId, homeworkId);
        homework.setContent(detail.getContent());
        homework.setAnswer(detail.getAnswer());
        return homework;
    }

    @Override
    public List<Teacher_Homework> findAll(String teacherId, String courseId) {
        List<Teacher_Homework> homeworkList = teacher_homeworkRepository.findByTeacherIdAndCourseId(teacherId, courseId);
        List list1 = teacher_homeworkDetailRepository.findByTeacherIdAndCourseId(teacherId, courseId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((Teacher_HomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setAnswer(((Teacher_HomeworkDetail)list1.get(i)).getAnswer());
        }

        return homeworkList;
    }
}
