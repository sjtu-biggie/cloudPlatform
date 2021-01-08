package com.CloudPlatform.entity;

import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "TEACHERHOMEWORK")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Transactional

public class TeacherHomework implements Serializable {
    private static final long serialVersionUID = 1L;

    public TeacherHomework(int _courseId, String _teacherId, String _title, String _range,
                           Date _startTime, Date _endTime,String _type,String _subject,
                           int _handinAmount, int _handinAlready, int _delayable, int _anspost){
        courseId = _courseId;
        teacherId = _teacherId;
        Title = _title;
        Range = _range;
        StartTime = _startTime;
        EndTime = _endTime;
        Type = _type;
        Subject = _subject;
        HandinAmount = _handinAmount;
        HandinAlready=_handinAlready;
        Delayable=_delayable;
        Anspost = _anspost;
    }

    public TeacherHomework(int _courseId, String _teacherId, String _title, String _range,
                           Date _startTime, Date _endTime,String _type,String _subject,
                           int _handinAmount, int _handinAlready, int _delayable,int _anspost,String _content,JSONObject _syllabus,String _answer,
                           String _ContentUpload, String _AnswerUpload){
        courseId = _courseId;
        teacherId = _teacherId;
        Title = _title;
        Range = _range;
        StartTime = _startTime;
        EndTime = _endTime;
        Type = _type;
        Subject = _subject;
        HandinAmount = _handinAmount;
        HandinAlready=_handinAlready;
        Delayable=_delayable;
        Anspost = _anspost;
        Content = _content;
        syllabus = _syllabus;
        Answer = _answer;
        ContentUpload = _ContentUpload;
        AnswerUpload = _AnswerUpload;
    }

    public TeacherHomework(int _homeworkId, int _courseId, String _teacherId, String _title, String _range,
                           Date _startTime, Date _endTime,String _type,String _subject,
                           int _handinAmount, int _handinAlready, int _delayable,int _anspost,String _content,JSONObject _syllabus,String _answer,
                           String _id, String _ContentUpload, String _AnswerUpload){
        homeworkId = _homeworkId;
        courseId = _courseId;
        teacherId = _teacherId;
        Title = _title;
        Range = _range;
        StartTime = _startTime;
        EndTime = _endTime;
        Type = _type;
        Subject = _subject;
        HandinAmount = _handinAmount;
        HandinAlready=_handinAlready;
        Delayable=_delayable;
        Anspost = _anspost;
        Content = _content;
        syllabus = _syllabus;
        Answer = _answer;
        id = _id;
        ContentUpload = _ContentUpload;
        AnswerUpload = _AnswerUpload;
    }


    @Id
    @Column(name = "HOMEWORKID")
    private int homeworkId;

    @Column(name = "COURSEID")
    private int courseId;

    @Column(name = "TEACHERID")
    private String teacherId;

    @Column(name = "TITLE")
    private String Title;

    @Column(name = "RANGE")
    private String Range;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "STARTTIME")
    private Date StartTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "ENDTIME")
    private Date EndTime;

    @Column(name = "TYPE")
    private String Type;

    @Column(name = "SUBJECT")
    private String Subject;

    @Column(name = "HANDINAMOUNT")
    private int HandinAmount;

    @Column(name = "HANDINALREADY")
    private int HandinAlready;

    @Column(name = "DELAYABLE")
    private int Delayable;

    @Column(name = "ANSPOST")
    private int Anspost;

    @Transient
    @Column(name = "CONTENT")
    private String Content;

    @Transient
    @Column(name = "SYLLABUS")
    private JSONObject syllabus;

    @Transient
    @Column(name = "ANSWER")
    private String Answer;

    @Transient
    @Column(name = "_ID")
    private String id;

    @Transient
    @Column(name = "CONTENTUPLOAD")
    private String ContentUpload;

    @Transient
    @Column(name = "ANSWERUPLOAD")
    private String AnswerUpload;

    @Transient
    List<String> ContentFile;

    @Transient
    List<String> AnswerFile;

}
