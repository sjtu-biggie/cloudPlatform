package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.Teacher_HomeworkMultiKeys;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "Teacher_Homework")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(Teacher_HomeworkMultiKeys.class)
@JsonIgnoreProperties(value = {"courseId","teacherId","homeworkId","hibernateLazyInitializer","fieldHandler"})
public class Teacher_Homework implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "courseId")
    private String courseId;

    @Id
    @Column(name = "homeworkId")
    private String homeworkId;

    @Id
    @Column(name = "teacherId")
    private String teacherId;

    @Column(name = "Title")
    private String Title;

    @Column(name = "Start_time")
    private Date Start_time;

    @Column(name = "End_time")
    private Date End_time;

    @Column(name = "Time_limit")
    private Date Time_limit;

    @Column(name = "Handin_amount")
    private int Handin_amount;

    @Column(name = "Assessment_Algorithms")
    private int Assessment_Algorithms;

    @Transient
    @Column(name = "Content")
    private String Content;

    @Transient
    @Column(name = "Answer")
    private String Answer;

}
