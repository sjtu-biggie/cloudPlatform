package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.dao.StudentHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.CloudPlatform.service.StudentHomeworkService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Double.parseDouble;
import java.util.Date;
import java.util.Random;

@Service
public class StudentHomeworkServiceImpl implements StudentHomeworkService {
    @Autowired
    private StudentHomeworkDao studenthomeworkDao;

    @Override
    public List<StudentHomework> getStudentHomeworkAll(String studentId) {
        return studenthomeworkDao.findAll(studentId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfCourse(String studentId, int courseId){
        return studenthomeworkDao.findAllOfCourse(studentId, courseId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomework(int homeworkId) {
        return studenthomeworkDao.findAllOfHomework(homeworkId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomeworkNoMongo(int homeworkId) {
        return studenthomeworkDao.findAllOfHomeworkNoMongo(homeworkId);
    }

    @Override
    public StudentHomework getStudentHomeworkOne(String studentId, int homeworkId){
        return studenthomeworkDao.findOne(studentId, homeworkId);
    }

    @Override
    public StudentHomework editStudentHomework(JSONObject object, String upload){
        JSONObject stuHw = object.getObject("homework",JSONObject.class);
        String Id = stuHw.getString("id");
        int homeworkId= stuHw.getInteger("homeworkId");
        int courseId= stuHw.getInteger("courseId");
        String studentId= stuHw.getString("studentId");
        String title= stuHw.getString("title");
        String comment= stuHw.getString("comment");
        String content= stuHw.getString("content");
        int finishHomework= stuHw.getInteger("finishHomework");
        int handinRank= stuHw.getInteger("handinRank");
        String nickName= stuHw.getString("nickName");
        String remarks = stuHw.getString("remarks");
        String subject= stuHw.getString("subject");
        String correct= stuHw.getString("correct");
        double score = stuHw.getDouble("score");
        Date startTime = stuHw.getDate("startTime");
        Date endTime = stuHw.getDate("endTime");
        Date handinTime = stuHw.getDate("handinTime");
        StudentHomework hw = new StudentHomework(studentId,homeworkId,courseId,nickName,handinTime,
                startTime,endTime,score,title,subject,content,correct,comment,remarks,Id, upload,
                finishHomework,handinRank);
        return studenthomeworkDao.editOne(hw);
    }

    @Override
    public StudentHomework addStudentHomework(JSONObject object, String upload){
        JSONObject stuHw = object.getObject("homework",JSONObject.class);
        String Id = stuHw.getString("id");
        int homeworkId= stuHw.getInteger("homeworkId");
        int courseId= stuHw.getInteger("courseId");
        String studentId= stuHw.getString("studentId");
        String title= stuHw.getString("title");
        String comment= stuHw.getString("comment");
        String content= stuHw.getString("content");
        int finishHomework= stuHw.getInteger("finishHomework");
        int handinRank= stuHw.getInteger("handinRank");
        String nickName= stuHw.getString("nickName");
        String remarks = stuHw.getString("remarks");
        String subject= stuHw.getString("subject");
        String correct= stuHw.getString("correct");
        double score = stuHw.getDouble("score");
        Date startTime = stuHw.getDate("startTime");
        Date endTime = stuHw.getDate("endTime");
        Date handinTime = stuHw.getDate("handinTime");

        StudentHomework hw = new StudentHomework(studentId,homeworkId,courseId,nickName,handinTime,
                startTime,endTime,score,title,subject,content,correct,comment,remarks,Id, upload,
                finishHomework,handinRank);
        return studenthomeworkDao.editOne(hw);
    }

    @Override
    public StudentHomework correctStudentHomework(JSONObject object) {
        String Id = object.getString("id");
        int homeworkId= object.getInteger("homeworkId");
        int courseId= object.getInteger("courseId");
        String studentId= object.getString("studentId");
        String title= object.getString("title");
        String comment= object.getString("comment");
        String content= object.getString("content");
        int finishHomework= object.getInteger("finishHomework");
        int handinRank= object.getInteger("handinRank");
        String nickName= object.getString("nickName");
        String remarks = object.getString("remarks");
        String subject= object.getString("subject");
        String correct= object.getString("correct");
        double score = object.getDouble("score");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");
        Date handinTime = object.getDate("handinTime");
        String upload = object.getString("upload");

        StudentHomework hw = new StudentHomework(studentId,homeworkId,courseId,nickName,handinTime,
                startTime,endTime,score,title,subject,content,correct,comment,remarks,Id, upload,
                finishHomework,handinRank);
        return studenthomeworkDao.editOne(hw);
    }

    @Override
    public void deleteStudentHomeworkAll(String studentId, int courseId){
        studenthomeworkDao.deleteAll(studentId, courseId);
    }
    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomeworkPage(int homeworkId, Pageable p){
        return studenthomeworkDao.findByHomeworkId(homeworkId,p);
    }

    @Override
    public double getAverage(int homeworkId) {
        double ave;
        double count = 0;
        double score = 0;
        List<StudentHomework> studentHomeworkList = studenthomeworkDao.findAllOfHomework(homeworkId);
        for (StudentHomework studentHomework : studentHomeworkList){
            if(studentHomework.getScore() != null){
                score += studentHomework.getScore();
                count++;
            }
        }
        ave = score/count;
        return ave;
    }

    @Override
    public void deleteStudentHomeworkOne(String studentId, int homeworkId){
        studenthomeworkDao.deleteOne(studentId, homeworkId);
    }
    @Override
    public String upload(MultipartFile file,String userId){
        String pathName = "/homework/"+userId+"/";//想要存储文件的地址
        String pname = file.getOriginalFilename();//获取文件名（包括后缀）
        FileOutputStream fos = null;
        try {
            File ffile=new File(pathName);
            if(!ffile.exists()){//如果文件夹不存在
                ffile.mkdir();//创建文件夹
            }
            pathName+=System.currentTimeMillis();
            pathName += pname;
            fos = new FileOutputStream(pathName);
            fos.write(file.getBytes()); // 写入文件
            System.out.println("文件上传成功");
            return pathName;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    @Override
    public StudentStat getStudentStatistics(String studentId, int courseId,int time){
        int finishHomework= studenthomeworkDao.getStudentHomeworkNum(studentId,courseId);
        int courseHomeworkNum = studenthomeworkDao.getCourseHomeworkNum(courseId);
        int ongoingHomework=0;
        int failedHomework =0;
        List<StudentHomework> studentHomeworkList = studenthomeworkDao.findAllOfCourse(studentId,courseId);
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
                Integer rank=studenthomeworkDao.getStudentHomeworkRank(studentId,studentHomework.getHomeworkId())+1;
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
