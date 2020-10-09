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
    private StudentHomeworkRepository student_homeworkRepository;
    private StudentHomeworkDetailRepository student_homeworkDetailRepository;

    @Autowired
    public StudentHomeworkDaoImpl(StudentHomeworkRepository Student_homeworkRepository, StudentHomeworkDetailRepository Student_homeworkDetailRepository){
        this.student_homeworkRepository = Student_homeworkRepository;
        this.student_homeworkDetailRepository = Student_homeworkDetailRepository;
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
        student_homeworkDetailRepository.save(homeworkDetail);
        return student_homeworkRepository.save(homework);
    }

    @Override
    public StudentHomework addOne(StudentHomework homework){
        student_homeworkRepository.save(homework);
        StudentHomeworkDetail homeworkDetail = new StudentHomeworkDetail();
        String t_id = homework.getStudentId();
        int h_id = homework.getHomeworkId();
        homeworkDetail.setStudentId(t_id);
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setComment(homework.getComment());
        homeworkDetail.setRemarks(homework.getRemarks());
        student_homeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public void deleteAll(String studentId, int courseId) {
        student_homeworkRepository.deleteByStudentIdAndCourseId(studentId,courseId);
        student_homeworkDetailRepository.deleteByStudentIdAndCourseId(studentId,courseId);
    }

    @Override
    public void deleteOne(String studentId, int homeworkId) {
        student_homeworkRepository.deleteByStudentIdAndHomeworkId(studentId, homeworkId);
        student_homeworkDetailRepository.deleteByStudentIdAndHomeworkId(studentId, homeworkId);
    }

    @Override
    public StudentHomework findOne(String studentId,  int homeworkId){
        StudentHomework homework = student_homeworkRepository.findByStudentIdAndHomeworkId(studentId, homeworkId);
        StudentHomeworkDetail detail =  student_homeworkDetailRepository.findByStudentIdAndHomeworkId(studentId, homeworkId);
        homework.setContent(detail.getContent());
        homework.setComment(detail.getComment());
        homework.setRemarks(detail.getRemarks());
        return homework;
    }

    @Override
    public List<StudentHomework> findAll(String studentId) {
        List<StudentHomework> homeworkList = student_homeworkRepository.findByStudentId(studentId);
        List list1 = student_homeworkDetailRepository.findByStudentId(studentId);
        List list2 = student_homeworkDetailRepository.findAll();
        System.out.println(list2);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
        }

        return homeworkList;
    }

    @Override
    public List<StudentHomework> findAllOfCourse(String studentId, int courseId) {
        List<StudentHomework> homeworkList = student_homeworkRepository.findByStudentIdAndCourseId(studentId, courseId);
        List list1 = student_homeworkDetailRepository.findByStudentIdAndCourseId(studentId, courseId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
        }

        return homeworkList;
    }

    @Override
    public List<StudentHomework> findAllOfHomework(int homeworkId) {
        List<StudentHomework> homeworkList = student_homeworkRepository.findByHomeworkId(homeworkId);
        List list1 = student_homeworkDetailRepository.findByHomeworkId(homeworkId);
        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
        }
        return homeworkList;
    }
}
