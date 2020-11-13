package com.CloudPlatform.daoimpl;

import com.CloudPlatform.dao.StudentHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentHomeworkDetail;
import com.CloudPlatform.repository.StudentHomeworkDetailRepository;
import com.CloudPlatform.repository.StudentHomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        int c_id = homework.getCourseId();
        String hwId = Integer.toString(h_id);
        String csId = Integer.toString(c_id);
        homeworkDetail.setId(homework.getId());
        homeworkDetail.setCourseId(csId);
        homeworkDetail.setHomeworkId(hwId);
        homeworkDetail.setStudentId(t_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setComment(homework.getComment());
        homeworkDetail.setRemarks(homework.getRemarks());
        homeworkDetail.setCorrect(homework.getCorrect());
        homeworkDetail.setUpload(homework.getUpload());
        studenthomeworkDetailRepository.save(homeworkDetail);
        return studenthomeworkRepository.save(homework);
    }

    @Override
    public StudentHomework addOne(StudentHomework homework){
        studenthomeworkRepository.Insert(homework.getEndTime(),
                homework.getStartTime(),
                homework.getSubject(),
                homework.getTitle(),
                homework.getNickName(),
                homework.getCourseId(),
                homework.getStudentId(),homework.getHomeworkId());
        StudentHomeworkDetail homeworkDetail = new StudentHomeworkDetail();
        String t_id = homework.getStudentId();
        int h_id = homework.getHomeworkId();
        int c_id = homework.getCourseId();
        String hwId = Integer.toString(h_id);
        String csId = Integer.toString(c_id);
        homeworkDetail.setId(homework.getId());
        homeworkDetail.setCourseId(csId);
        homeworkDetail.setHomeworkId(hwId);
        homeworkDetail.setStudentId(t_id);
//        homeworkDetail.setContent(homework.getContent());
//        homeworkDetail.setComment(homework.getComment());
//        homeworkDetail.setRemarks(homework.getRemarks());
//        homeworkDetail.setCorrect(homework.getCorrect());
//        homeworkDetail.setUpload(homework.getUpload());
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
        System.out.println("homeworkId:"+homeworkId);
        System.out.println("studentId:"+studentId);
        System.out.println("homework:"+homework);
        String hwId = Integer.toString(homeworkId);
        StudentHomeworkDetail detail =  studenthomeworkDetailRepository.findByStudentIdAndHomeworkId(studentId, hwId);
        System.out.println("detail"+detail);
        homework.setId(detail.getId());
        homework.setContent(detail.getContent());
        homework.setComment(detail.getComment());
        homework.setRemarks(detail.getRemarks());
        homework.setCorrect(detail.getCorrect());
        homework.setUpload(detail.getUpload());
        return homework;
    }

    @Override
    public List<StudentHomework> findAll(String studentId) {
        List<StudentHomework> homeworkList = studenthomeworkRepository.findByStudentId(studentId);
        List list1 = studenthomeworkDetailRepository.findAllByStudentId(studentId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setId(((StudentHomeworkDetail)list1.get(i)).getId());
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
            (homeworkList.get(i)).setCorrect(((StudentHomeworkDetail)list1.get(i)).getCorrect());
            (homeworkList.get(i)).setUpload(((StudentHomeworkDetail)list1.get(i)).getUpload());
        }

        return homeworkList;
    }

    @Override
    public List<StudentHomework> findAllOfCourse(String studentId, int courseId) {
        String cId = Integer.toString(courseId);
        List<StudentHomework> homeworkList = studenthomeworkRepository.findByStudentIdAndCourseId(studentId, courseId);
        for(int i = 0; i < homeworkList.size();++i){
            StudentHomeworkDetail studentHomeworkDetail = studenthomeworkDetailRepository.findByStudentIdAndHomeworkId(studentId,Integer.toString(homeworkList.get(i).getHomeworkId()));
            if(studentHomeworkDetail!=null){
                (homeworkList.get(i)).setId(studentHomeworkDetail.getId());
                (homeworkList.get(i)).setContent(studentHomeworkDetail.getContent());
                (homeworkList.get(i)).setComment(studentHomeworkDetail.getComment());
                (homeworkList.get(i)).setRemarks(studentHomeworkDetail.getRemarks());
                (homeworkList.get(i)).setCorrect(studentHomeworkDetail.getCorrect());
                (homeworkList.get(i)).setUpload(studentHomeworkDetail.getUpload());
            }
        }
        return homeworkList;
    }

    @Override
    public List<StudentHomework> findAllOfHomework(int homeworkId) {
        String hwId = Integer.toString(homeworkId);
        List<StudentHomework> homeworkList = studenthomeworkRepository.findByHomeworkId(homeworkId);
        List<StudentHomeworkDetail> list1 = studenthomeworkDetailRepository.findAllByHomeworkId(hwId);
        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setId(((StudentHomeworkDetail)list1.get(i)).getId());
            (homeworkList.get(i)).setContent(((StudentHomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((StudentHomeworkDetail)list1.get(i)).getComment());
            (homeworkList.get(i)).setRemarks(((StudentHomeworkDetail)list1.get(i)).getRemarks());
            (homeworkList.get(i)).setCorrect(((StudentHomeworkDetail)list1.get(i)).getCorrect());
            (homeworkList.get(i)).setUpload(((StudentHomeworkDetail)list1.get(i)).getUpload());
        }
        return homeworkList;
    }

    @Override
    public List<StudentHomework> findAllOfHomeworkNoMongo(int homeworkId) {
        List<StudentHomework> homeworkList = studenthomeworkRepository.findByHomeworkId(homeworkId);
        return homeworkList;
    }

    @Override
    public Integer getStudentHomeworkRank(String studentId,int homeworkId){
        return studenthomeworkRepository.getStudentHomeworkRank(studentId,homeworkId);
    }
    @Override
    public Integer getStudentHandinRank(String studentId,int homeworkId){
        return studenthomeworkRepository.getStudentHandinRank(studentId,homeworkId);
    }
    @Override
    public Integer getCourseHomeworkNum(int courseId){
        return studenthomeworkRepository.getCourseHomeworkNum(courseId);
    }
    @Override
    public Integer getStudentHomeworkNum(String studentId,int courseId){
        return studenthomeworkRepository.getStudentHomeworkNum(studentId,courseId);
    }
    @Override
    public List<StudentHomework> findByHomeworkId(int homeworkId, Pageable p){
        String hwId = Integer.toString(homeworkId);
        List<StudentHomework> homeworkList = studenthomeworkRepository.findAllByHomeworkId(homeworkId,p).getContent();
        for(int i = 0; i < homeworkList.size();++i){
            StudentHomeworkDetail studentHomeworkDetail = studenthomeworkDetailRepository.findByStudentIdAndHomeworkId(homeworkList.get(i).getStudentId(),Integer.toString(homeworkList.get(i).getHomeworkId()));
            if(studentHomeworkDetail!=null){
                (homeworkList.get(i)).setId(studentHomeworkDetail.getId());
                (homeworkList.get(i)).setContent(studentHomeworkDetail.getContent());
                (homeworkList.get(i)).setComment(studentHomeworkDetail.getComment());
                (homeworkList.get(i)).setRemarks(studentHomeworkDetail.getRemarks());
                (homeworkList.get(i)).setCorrect(studentHomeworkDetail.getCorrect());
                (homeworkList.get(i)).setUpload(studentHomeworkDetail.getUpload());
            }
        }

        return homeworkList;
    }
}
