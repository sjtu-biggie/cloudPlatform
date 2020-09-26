package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.Student_HomeworkMultiKeys;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "Student_Homework")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(Student_HomeworkMultiKeys.class)
@JsonIgnoreProperties(value = {"courseId","studentId","homeworkId","hibernateLazyInitializer","fieldHandler"})
public class Student_Homework {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "courseId")
    private String courseId;
    @Id
    @Column(name = "studentId")
    private String studentId;
    @Id
    @Column(name = "homeworkId")
    private String homeworkId;

    @Column(name = "Handin_time")
    private Date Handin_time;

    @Column(name = "Start_time")
    private Date Start_time;

    @Column(name = "End_time")
    private Date End_time;

    @Column(name = "Grade")
    private Double Grade;

    @Transient
    @Column(name = "Content")
    private String Content;

    @Transient
    @Column(name = "Comment")
    private String Comment;
}
