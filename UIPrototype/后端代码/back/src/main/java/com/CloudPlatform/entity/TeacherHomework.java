package com.CloudPlatform.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "TEACHERHOMEWORK")
@Data
@AllArgsConstructor
@NoArgsConstructor

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

    @Column(name = "STARTTIME")
    private Date StartTime;

    @Column(name = "ENDTIME")
    private Date EndTime;

    @Column(name = "TIMELIMIT")
    private Date TimeLimit;

    @Column(name = "HANDINAMOUNT")
    private int HandinAmount;

    @Column(name = "ASSESSMENTALGORITHMS")
    private int AssessmentAlgorithms;

    @Transient
    @Column(name = "CONTENT")
    private String Content;

    @Transient
    @Column(name = "ANSWER")
    private String Answer;

}
