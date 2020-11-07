package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.StudentHomeworkMultiKeys;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "STUDENTHOMEWORK")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Transactional
@IdClass(StudentHomeworkMultiKeys.class)

public class StudentHomework {
    private static final long serialVersionUID = 1L;

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
}
