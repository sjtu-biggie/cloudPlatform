package com.CloudPlatform.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "TEACHERHOMEWORK")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Transactional

public class TeacherHomework implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "HOMEWORKID",length = 16)
    private int homeworkId;

    @Column(name = "COURSEID",length = 16)
    private int courseId;

    @Column(name = "TEACHERID",length = 16)
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

    @Transient
    @Column(name = "CONTENT")
    private String Content;

    @Transient
    @Column(name = "ANSWER")
    private String Answer;

}
