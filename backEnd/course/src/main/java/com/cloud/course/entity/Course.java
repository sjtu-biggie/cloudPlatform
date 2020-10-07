package com.cloud.course.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "COURSE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "ID")
    private int id;
    @Column(name = "USER_ID")
    private String userId;
    @Column(name = "COURSE_NAME")
    private String courseName;
    @Column(name = "START_DATE")
    private Date startDate;
    @Column(name = "END_DATE")
    private Date endDate;
    @Column(name = "TYPE")
    private String type;
    @Column(name = "GRADE")
    private String grade;

    public Course(String _user_id,String _course_name,Date _start_date,Date _end_date,String _type,String _grade){
        userId=_user_id;
        courseName=_course_name;
        startDate=_start_date;
        endDate=_end_date;
        type=_type;
        grade=_grade;
    }
}
