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
    private TeacherHomeworkRepository teacherhomeworkRepository;
    private TeacherHomeworkDetailRepository teacherhomeworkDetailRepository;

    @Autowired
    public TeacherHomeworkDaoImpl(TeacherHomeworkRepository teacherhomeworkRepository, TeacherHomeworkDetailRepository teacherhomeworkDetailRepository){
        this.teacherhomeworkRepository = teacherhomeworkRepository;
        this.teacherhomeworkDetailRepository = teacherhomeworkDetailRepository;
    }

    @Override
    public TeacherHomework editOne(TeacherHomework homework){
        TeacherHomeworkDetail homeworkDetail = new TeacherHomeworkDetail();
        int h_id = homework.getHomeworkId();
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        teacherhomeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public TeacherHomework addOne(TeacherHomework homework){
        teacherhomeworkRepository.save(homework);
        TeacherHomeworkDetail homeworkDetail = new TeacherHomeworkDetail();
        int h_id = homework.getHomeworkId();
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        teacherhomeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public void deleteAll(int courseId) {
        String cId = Integer.toString(courseId);
        teacherhomeworkRepository.deleteByCourseId(courseId);
        teacherhomeworkDetailRepository.deleteByCourseId(cId);
    }

    @Override
    public void deleteOne(int homeworkId) {
        String hwId = Integer.toString(homeworkId);
        teacherhomeworkRepository.deleteByHomeworkId(homeworkId);
        teacherhomeworkDetailRepository.deleteByHomeworkId(hwId);
    }

    @Override
    public TeacherHomework findOne(int homeworkId){
        String hwId = Integer.toString(homeworkId);
        TeacherHomework homework = teacherhomeworkRepository.findByHomeworkId(homeworkId);
        TeacherHomeworkDetail detail =  teacherhomeworkDetailRepository.findByHomeworkId(hwId);
        homework.setContent(detail.getContent());
        homework.setAnswer(detail.getAnswer());
        return homework;
    }

    @Override
    public List<TeacherHomework> findAll() {
        List<TeacherHomework> homeworkList = teacherhomeworkRepository.findAll();
        List<TeacherHomeworkDetail> list1 = teacherhomeworkDetailRepository.findAll();

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((TeacherHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setAnswer(((TeacherHomeworkDetail)list1.get(i)).getAnswer());
        }

        return homeworkList;
    }

    @Override
    public List<TeacherHomework> findAllOfCourse(int courseId) {
        String cId = Integer.toString(courseId);
        List<TeacherHomework> homeworkList = teacherhomeworkRepository.findAllByCourseId(courseId);
        List list1 = teacherhomeworkDetailRepository.findAllByCourseId(cId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((TeacherHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setAnswer(((TeacherHomeworkDetail)list1.get(i)).getAnswer());
        }

        return homeworkList;
    }
}