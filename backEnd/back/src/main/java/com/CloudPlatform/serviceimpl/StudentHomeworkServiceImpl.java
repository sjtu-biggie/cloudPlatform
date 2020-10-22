package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.StudentHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.CloudPlatform.service.StudentHomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Double.parseDouble;
import java.util.Date;
import java.util.Random;

@Service
public class StudentHomeworkServiceImpl implements StudentHomeworkService {
    @Autowired
    private StudentHomeworkDao student_homeworkDao;

    @Override
    public List<StudentHomework> getStudentHomeworkAll(String studentId) {
        return student_homeworkDao.findAll(studentId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfCourse(String studentId, int courseId){
        return student_homeworkDao.findAllOfCourse(studentId, courseId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomework(int homeworkId) {
        return student_homeworkDao.findAllOfHomework(homeworkId);
    }

    @Override
    public StudentHomework getStudentHomeworkOne(String studentId, int homeworkId){
        return student_homeworkDao.findOne(studentId, homeworkId);
    }

    @Override
    public StudentHomework editStudentHomework(StudentHomework homework){
        return student_homeworkDao.editOne(homework);
    }

    @Override
    public StudentHomework addStudentHomework(StudentHomework homework){
        return student_homeworkDao.addOne(homework);
    }

    @Override
    public void deleteStudentHomeworkAll(String studentId, int courseId){
        student_homeworkDao.deleteAll(studentId, courseId);
    }

    @Override
    public void deleteStudentHomeworkOne(String studentId, int homeworkId){
        student_homeworkDao.deleteOne(studentId, homeworkId);
    }
    @Override
    public StudentStat getStudentStatistics(String studentId, int courseId,int time){
        int finishHomework= student_homeworkDao.getStudentHomeworkNum(studentId,courseId);
        int courseHomeworkNum = student_homeworkDao.getCourseHomeworkNum(courseId);
        int ongoingHomework=0;
        int failedHomework =0;
        List<StudentHomework> studentHomeworkList = student_homeworkDao.findAllOfCourse(studentId,courseId);
        float meanScore=0,recentMeanScore=0;
        int recentMeanScoreNum=0;
        List <Integer> homeworkRankChange=new ArrayList<>();
        List <Double> homeworkScoreChange=new ArrayList<>();
        List <Integer> handinChange=new ArrayList<>();
        List <Integer> ddlChange=new ArrayList<>();
        for (StudentHomework studentHomework : studentHomeworkList){
            //还未批改的作业不进入统计
            if(studentHomework.getScore()==null){
                if(studentHomework.getHandinTime()==null){
                    finishHomework--;
                }
                courseHomeworkNum--;
                ongoingHomework++;
                continue;
            }
            //处理缺交的作业
            if(studentHomework.getScore()==-1){
                System.out.println("sad");
                failedHomework++;
                studentHomework.setScore(parseDouble("0"));
            }
            meanScore +=studentHomework.getScore();
            if(recentMeanScoreNum<time){
                recentMeanScoreNum++;
                recentMeanScore+=studentHomework.getScore();
                Integer rank=student_homeworkDao.getStudentHomeworkRank(studentId,studentHomework.getHomeworkId())+1;
                homeworkRankChange.add(rank);
                homeworkScoreChange.add(studentHomework.getScore());
                Date handinTime = studentHomework.getHandinTime();
                Date startTime = studentHomework.getStartTime();
                Date endTime = studentHomework.getEndTime();
                int start2hand = (handinTime.getYear() - startTime.getYear()) * 24 * 60*30*12+(handinTime.getMonth() - startTime.getMonth()) * 24 * 60*30+(handinTime.getDay() - startTime.getDay()) * 24 * 60 + (handinTime.getHours() - startTime.getHours()) * 60 + (handinTime.getMinutes() - startTime.getMinutes());
                if(start2hand<0) start2hand = 299;
                handinChange.add(start2hand);
                int hand2end =(endTime.getYear() - handinTime.getYear()) * 24 * 60*30*12+(endTime.getMonth() - handinTime.getMonth()) * 24 * 60*30+(endTime.getDay() - handinTime.getDay()) * 24 * 60 + (endTime.getHours() - handinTime.getHours()) * 60 + (endTime.getMinutes() - handinTime.getMinutes());
                if(hand2end<0) hand2end = 299;
                ddlChange.add(hand2end);
            }
        }
        meanScore = meanScore / courseHomeworkNum;
        recentMeanScore = recentMeanScore/recentMeanScoreNum;
        return new StudentStat(finishHomework,ongoingHomework,failedHomework,meanScore,recentMeanScore,homeworkRankChange,homeworkScoreChange,handinChange,ddlChange);
    }
}
