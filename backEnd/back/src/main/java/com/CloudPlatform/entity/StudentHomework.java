package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.StudentHomeworkMultiKeys;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "STUDENTHOMEWORK")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Transactional
@IdClass(StudentHomeworkMultiKeys.class)

public class StudentHomework {
    private static final long serialVersionUID = 1L;

    public StudentHomework(int _courseId, String _studentId, String _title,
                           Date _startTime, Date _endTime, String _nickname, String _subject
    ) {
        courseId = _courseId;
        studentId = _studentId;
        Title = _title;
        StartTime = _startTime;
        EndTime = _endTime;
        Subject = _subject;
        nickName = _nickname;
    }

    public StudentHomework(String _studentId,int _homeworkId,int _courseId, String _nickname, Date _handintime,
                           Date _startTime, Date _endTime,Double _score, String _title, String _subject, String _content, String _correct, String _comment, String _remarks, String _id, String _uploads,int _finishHomework,int _handinRank
                           ) {
        courseId = _courseId;
        studentId = _studentId;
        homeworkId = _homeworkId;
        HandinTime = _handintime;
        Title = _title;
        Score = _score;
        StartTime = _startTime;
        EndTime = _endTime;
        Subject = _subject;
        nickName = _nickname;
        Content = _content;
        Comment = _comment;
        Correct = _correct;
        Remarks = _remarks;
        id = _id;
        handinRank = _handinRank;
        finishHomework = _finishHomework;
    }

    @Id
    @Column(name = "STUDENTID")
    private String studentId;

    @Id
    @Column(name = "HOMEWORKID")
    private int homeworkId;

    @Column(name = "COURSEID")
    private int courseId;

    @Column(name = "NICKNAME")
    private String nickName;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "HANDINTIME")
    private Date HandinTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "STARTTIME")
    private Date StartTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "ENDTIME")
    private Date EndTime;

    @Column(name = "SCORE")
    private Double Score;

    @Column(name = "TITLE")
    private String Title;

    @Column(name = "SUBJECT")
    private String Subject;

    @Transient
    @Column(name = "CONTENT")
    private String Content;

    @Transient
    @Column(name = "CORRECT")
    private String Correct;

    @Transient
    @Column(name = "COMMENT")
    private String Comment;

    @Transient
    @Column(name = "REMARKS")
    private String Remarks;

    @Transient
    @Column(name = "_ID")
    private String id;

    @Transient
    @Column(name = "UPLOAD")
    private String Upload;

    @Transient
    private int finishHomework;

    @Transient
    private int handinRank;

    @Transient
    List<MultipartFile> file;
}
