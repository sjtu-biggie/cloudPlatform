package com.CloudPlatform.daoimpl;

import com.CloudPlatform.dao.Student_HomeworkDao;
import com.CloudPlatform.entity.Student_Homework;
import com.CloudPlatform.entity.Student_HomeworkDetail;
import com.CloudPlatform.repository.Student_HomeworkDetailRepository;
import com.CloudPlatform.repository.Student_HomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Student_HomeworkDaoImpl implements Student_HomeworkDao {
    private Student_HomeworkRepository student_homeworkRepository;
    private Student_HomeworkDetailRepository student_homeworkDetailRepository;

    @Autowired
    public Student_HomeworkDaoImpl(Student_HomeworkRepository Student_homeworkRepository, Student_HomeworkDetailRepository Student_homeworkDetailRepository){
        this.student_homeworkRepository = Student_homeworkRepository;
        this.student_homeworkDetailRepository = Student_homeworkDetailRepository;
    }

    @Override
    public Student_Homework editOne(Student_Homework homework){
        Student_HomeworkDetail homeworkDetail = new Student_HomeworkDetail();
        String c_id = homework.getCourseId();
        String t_id = homework.getStudentId();
        String h_id = homework.getHomeworkId();
        homeworkDetail.setCourseId(c_id);
        homeworkDetail.setStudentId(t_id);
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setComment(homework.getComment());
        student_homeworkDetailRepository.save(homeworkDetail);
        return student_homeworkRepository.save(homework);
    }

    @Override
    public Student_Homework addOne(Student_Homework homework){
        student_homeworkRepository.save(homework);
        Student_HomeworkDetail homeworkDetail = new Student_HomeworkDetail();
        String c_id = homework.getCourseId();
        String t_id = homework.getStudentId();
        String h_id = homework.getHomeworkId();
        homeworkDetail.setCourseId(c_id);
        homeworkDetail.setStudentId(t_id);
        homeworkDetail.setHomeworkId(h_id);
        homeworkDetail.setContent(homework.getContent());
        homeworkDetail.setComment(homework.getComment());
        student_homeworkDetailRepository.save(homeworkDetail);
        return homework;
    }

    @Override
    public void deleteAll(String StudentId, String courseId) {
        student_homeworkRepository.deleteByStudentIdAndCourseId(StudentId,courseId);
        student_homeworkDetailRepository.deleteByStudentIdAndCourseId(StudentId,courseId);
    }

    @Override
    public void deleteOne(String StudentId, String courseId, String homeworkId) {
        student_homeworkRepository.deleteByStudentIdAndCourseIdAndHomeworkId(StudentId,courseId, homeworkId);
        student_homeworkDetailRepository.deleteByStudentIdAndCourseIdAndHomeworkId(StudentId,courseId, homeworkId);
    }

    @Override
    public Student_Homework findOne(String StudentId, String courseId, String homeworkId){
        Student_Homework homework = student_homeworkRepository.findByStudentIdAndCourseIdAndHomeworkId(StudentId, courseId, homeworkId);
        Student_HomeworkDetail detail =  student_homeworkDetailRepository.findByStudentIdAndCourseIdAndHomeworkId(StudentId, courseId, homeworkId);
        homework.setContent(detail.getContent());
        homework.setComment(detail.getComment());
        return homework;
    }

    @Override
    public List<Student_Homework> findAll(String StudentId, String courseId) {
        System.out.println(StudentId);
        System.out.println(courseId);
        List<Student_Homework> homeworkList = student_homeworkRepository.findByStudentIdAndCourseId(StudentId, courseId);
        List list1 = student_homeworkDetailRepository.findByStudentIdAndCourseId(StudentId, courseId);

        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((Student_HomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((Student_HomeworkDetail)list1.get(i)).getComment());
        }

        return homeworkList;
    }

    @Override
    public List<Student_Homework> findAllOfHomework(String courseId, String homeworkId) {
        List<Student_Homework> homeworkList = student_homeworkRepository.findByCourseIdAndHomeworkId(courseId,homeworkId);
        List list1 = student_homeworkDetailRepository.findByCourseIdAndHomeworkId(courseId,homeworkId);
        for(int i = 0; i < homeworkList.size();++i){
            (homeworkList.get(i)).setContent(((Student_HomeworkDetail)list1.get(i)).getContent());
            (homeworkList.get(i)).setComment(((Student_HomeworkDetail)list1.get(i)).getComment());
        }
        return homeworkList;
    }
}
