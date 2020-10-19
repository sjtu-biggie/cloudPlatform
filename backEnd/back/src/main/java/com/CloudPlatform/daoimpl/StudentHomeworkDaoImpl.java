package com.CloudPlatform.daoimpl;

import com.CloudPlatform.dao.StudentHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentHomeworkDetail;
import com.CloudPlatform.repository.StudentHomeworkDetailRepository;
import com.CloudPlatform.repository.StudentHomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentHomeworkDaoImpl implements StudentHomeworkDao {
    private StudentHomeworkRepository studenthomeworkRepository;
    private StudentHomeworkDetailRepository studenthomeworkDetailRepository;

    @Autowired
    public StudentHomeworkDaoImpl(StudentHomeworkRepository studenthomeworkRepository, StudentHomeworkDetailRepository studenthomeworkDetailRepository){
        this.studenthomeworkRepository = studenthomeworkRepository;
        this.studenthomeworkDetailRepository = studenthomeworkDetailRepository;
    }

    @Override
    public StudentHomework editOne(StudentHomework homework){
        StudentHomeworkDetail homeworkDetail = new StudentHomeworkDetail();
        String t_id = homework.getStudentId();
        int h_id = homework.getHomeworkId();
        homeworkDetail.setStudentId(t_id);
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setComment(homework.getComment());
        homeworkDetail.setRemarks(homework.getRemarks());
        studenthomeworkDetailRepository.save(homeworkDetail);
        return studenthomeworkRepository.save(homework);
    }

    @Override
    public StudentHomework addOne(StudentHomework homework){
        studenthomeworkRepository.save(homework);
        StudentHomeworkDetail homeworkDetail = new StudentHomeworkDetail();
        String t_id = homework.getStudentId();
        int h_id = homework.getHomeworkId();
        homeworkDetail.setStudentId(t_id);
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setComment(homework.getComment());
        homeworkDetail.setRemarks(homework.getRemarks());
        studenthomeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public void deleteAll(String studentId, int courseId) {
        String cId = Integer.toString(courseId);
        studenthomeworkRepository.deleteByStudentIdAndCourseId(studentId,courseId);
        studenthomeworkDetailRepository.deleteByStudentIdAndCourseId(studentId,cId);
    }

    @Override
    public void deleteOne(String studentId, int homeworkId) {
        String hwId = Integer.toString(homeworkId);
        studenthomeworkRepository.deleteByStudentIdAndHomeworkId(studentId, homeworkId);
        studenthomeworkDetailRepository.deleteByStudentIdAndHomeworkId(studentId, hwId);
    }

    @Override
    public StudentHomework findOne(String studentId,  int homeworkId){
        StudentHomework homework = studenthomeworkRepository.findByStudentIdAndHomeworkId(studentId, homeworkId);
        String hwId = Integer.toString(homeworkId);
        StudentHomeworkDetail detail =  studenthomeworkDetailRepository.findByStudentIdAndHomeworkId(studentId, hwId);
        homework.setContent(detail.getContent());
        homework.setComment(detail.getComment());
        homework.setRemarks(detail.getRemarks());
        return homework;
    }

    @Override
    public List<StudentHomework> findAll(String studentId) {
        List<StudentHomework> homeworkList = studenthomeworkRepository.findByStudentId(studentId);
        List list1 = studenthomeworkDetailRepository.findAllByStudentId(studentId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
        }

        return homeworkList;
    }

    @Override
    public List<StudentHomework> findAllOfCourse(String studentId, int courseId) {
        String cId = Integer.toString(courseId);
        List<StudentHomework> homeworkList = studenthomeworkRepository.findByStudentIdAndCourseId(studentId, courseId);
        List list1 = studenthomeworkDetailRepository.findAllByStudentIdAndCourseId(studentId, cId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
        }

        return homeworkList;
    }

    @Override
    public List<StudentHomework> findAllOfHomework(int homeworkId) {
        String hwId = Integer.toString(homeworkId);
        List<StudentHomework> homeworkList = studenthomeworkRepository.findByHomeworkId(homeworkId);
        List<StudentHomeworkDetail> list1 = studenthomeworkDetailRepository.findAllByHomeworkId(hwId);
        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
        }
        return homeworkList;
    }
}
