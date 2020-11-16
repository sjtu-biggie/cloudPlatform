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
        teacherhomeworkRepository.Update(
                homework.getEndTime(),
                homework.getHandinAmount(),
                homework.getRange(),
                homework.getStartTime(),
                homework.getSubject(),
                homework.getTitle(),
                homework.getType(),
                homework.getCourseId(),
                homework.getTeacherId(),
                homework.getHandinAlready(),
                homework.getHomeworkId());

        TeacherHomeworkDetail homeworkDetail = new TeacherHomeworkDetail();
        int h_id = homework.getHomeworkId();
        int c_id = homework.getCourseId();
        String hwId = Integer.toString(h_id);
        String csId = Integer.toString(c_id);
        homeworkDetail.setId(homework.getId());
        homeworkDetail.setHomeworkId(hwId);
        homeworkDetail.setCourseId(csId);
        homeworkDetail.setTeacherId(homework.getTeacherId());
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        homeworkDetail.setAnswerUpload(homework.getAnswerUpload());
        homeworkDetail.setContentUpload(homework.getContentUpload());
        homeworkDetail.setSyllabus(homework.getSyllabus());
        teacherhomeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public int addOne(TeacherHomework homework){
        int maxId = teacherhomeworkRepository.getMaxId()+1;
        teacherhomeworkRepository.Insert(homework.getEndTime(),
                homework.getHandinAmount(),
                homework.getRange(),
                homework.getStartTime(),
                homework.getSubject(),
                homework.getTitle(),
                homework.getType(),
                homework.getCourseId(),
                homework.getTeacherId(),maxId,homework.getHandinAlready());

        TeacherHomeworkDetail homeworkDetail = new TeacherHomeworkDetail();
        int h_id = maxId;
        int c_id = homework.getCourseId();
        String hwId = Integer.toString(h_id);
        String csId = Integer.toString(c_id);
        homeworkDetail.setId(homework.getId());
        homeworkDetail.setHomeworkId(hwId);
        homeworkDetail.setCourseId(csId);
        homeworkDetail.setTeacherId(homework.getTeacherId());
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setAnswer(homework.getAnswer());
        homeworkDetail.setAnswerUpload(homework.getAnswerUpload());
        homeworkDetail.setContentUpload(homework.getContentUpload());
        homeworkDetail.setSyllabus(homework.getSyllabus());
        teacherhomeworkDetailRepository.save(homeworkDetail);
        return maxId;
    }

    @Override
    public void updateHandinAlready(TeacherHomework homework) {
        teacherhomeworkRepository.UpdateHandinAlready(
                homework.getHandinAlready(),homework.getHomeworkId());
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
        homework.setId(detail.getId());
        homework.setContent(detail.getContent());
        homework.setSyllabus(detail.getSyllabus());
        homework.setAnswer(detail.getAnswer());
        homework.setAnswerUpload(detail.getAnswerUpload());
        homework.setContentUpload(detail.getContentUpload());
        return homework;
    }

    @Override
    public List<TeacherHomework> findAllByTeacherId(String teacherId) {
        List<TeacherHomework> homeworkList = teacherhomeworkRepository.findAllByTeacherId(teacherId);
        List<TeacherHomeworkDetail> list1 = teacherhomeworkDetailRepository.findAllByTeacherId(teacherId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setId(((TeacherHomeworkDetail)list1.get(i)).getId());
            (homeworkList.get(i)).setContent(((TeacherHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setSyllabus(((TeacherHomeworkDetail)list1.get(i)).getSyllabus());
            (homeworkList.get(i)).setAnswer(((TeacherHomeworkDetail)list1.get(i)).getAnswer());
            (homeworkList.get(i)).setAnswerUpload(((TeacherHomeworkDetail)list1.get(i)).getAnswerUpload());
            (homeworkList.get(i)).setContentUpload(((TeacherHomeworkDetail)list1.get(i)).getContentUpload());
        }

        return homeworkList;
    }

    @Override
    public List<TeacherHomework> findAllOfCourse(int courseId) {
        String cId = Integer.toString(courseId);
        List<TeacherHomework> homeworkList = teacherhomeworkRepository.findAllByCourseId(courseId);
        List list1 = teacherhomeworkDetailRepository.findAllByCourseId(cId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setId(((TeacherHomeworkDetail)list1.get(i)).getId());
            (homeworkList.get(i)).setContent(((TeacherHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setSyllabus(((TeacherHomeworkDetail)list1.get(i)).getSyllabus());
            (homeworkList.get(i)).setAnswer(((TeacherHomeworkDetail)list1.get(i)).getAnswer());
            (homeworkList.get(i)).setAnswerUpload(((TeacherHomeworkDetail)list1.get(i)).getAnswerUpload());
            (homeworkList.get(i)).setContentUpload(((TeacherHomeworkDetail)list1.get(i)).getContentUpload());
        }

        return homeworkList;
    }
}
