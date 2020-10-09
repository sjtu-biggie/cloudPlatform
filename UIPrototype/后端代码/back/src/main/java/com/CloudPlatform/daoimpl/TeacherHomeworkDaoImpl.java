package com.CloudPlatform.daoimpl;

import com.CloudPlatform.dao.TeacherHomeworkDao;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.entity.TeacherHomeworkDetail;
import com.CloudPlatform.repository.TeacherHomeworkDetailRepository;
import com.CloudPlatform.repository.TeacherHomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TeacherHomeworkDaoImpl implements TeacherHomeworkDao {
    private TeacherHomeworkRepository teacher_homeworkRepository;
    private TeacherHomeworkDetailRepository teacher_homeworkDetailRepository;

    @Autowired
    public TeacherHomeworkDaoImpl(TeacherHomeworkRepository teacher_homeworkRepository, TeacherHomeworkDetailRepository teacher_homeworkDetailRepository){
        this.teacher_homeworkRepository = teacher_homeworkRepository;
        this.teacher_homeworkDetailRepository = teacher_homeworkDetailRepository;
    }

    @Override
    public TeacherHomework editOne(TeacherHomework homework){
        TeacherHomeworkDetail homeworkDetail = new TeacherHomeworkDetail();
        int h_id = homework.getHomeworkId();
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        teacher_homeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public TeacherHomework addOne(TeacherHomework homework){
        teacher_homeworkRepository.save(homework);
        TeacherHomeworkDetail homeworkDetail = new TeacherHomeworkDetail();
        int h_id = homework.getHomeworkId();
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        teacher_homeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public void deleteAll(int courseId) {
        teacher_homeworkRepository.deleteByCourseId(courseId);
        teacher_homeworkDetailRepository.deleteByCourseId(courseId);
    }

    @Override
    public void deleteOne(int homeworkId) {
        teacher_homeworkRepository.deleteByHomeworkId(homeworkId);
        teacher_homeworkDetailRepository.deleteByHomeworkId(homeworkId);
    }

    @Override
    public TeacherHomework findOne(int homeworkId){
        TeacherHomework homework = teacher_homeworkRepository.findByHomeworkId(homeworkId);
        TeacherHomeworkDetail detail =  teacher_homeworkDetailRepository.findByHomeworkId(homeworkId);
        homework.setContent(detail.getContent());
        homework.setAnswer(detail.getAnswer());
        return homework;
    }

    @Override
    public List<TeacherHomework> findAll() {
        List<TeacherHomework> homeworkList = teacher_homeworkRepository.findAll();
        List list1 = teacher_homeworkDetailRepository.findAll();

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((TeacherHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setAnswer(((TeacherHomeworkDetail)list1.get(i)).getAnswer());
        }

        return homeworkList;
    }

    @Override
    public List<TeacherHomework> findAllOfCourse(int courseId) {
        List<TeacherHomework> homeworkList = teacher_homeworkRepository.findByCourseId(courseId);
        List list1 = teacher_homeworkDetailRepository.findByCourseId(courseId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((TeacherHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setAnswer(((TeacherHomeworkDetail)list1.get(i)).getAnswer());
        }

        return homeworkList;
    }
}
