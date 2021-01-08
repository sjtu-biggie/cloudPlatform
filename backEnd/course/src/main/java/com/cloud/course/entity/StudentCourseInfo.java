package com.cloud.course.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@IdClass(StudentCourseInfoKeys.class)
@Entity
@Table(name = "STUDENT_COURSE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentCourseInfo {
    @Id
    @Column(name = "USER_ID")
    private String userId;
    @Id
    @Column(name = "COURSE_ID")
    private Integer courseId;
    @Column(name = "GRADE")
    private Double grade;
    @Column(name = "STATUS")
    private Integer status;
    @Column(name = "JOIN_DATE")
    private Date join_date;
    @Column(name = "NICKNAME")
    private String nickname;
    @Column(name = "THECLASS")
    private String theClass;
    @Column(name = "SID")
    private String sid;
}
