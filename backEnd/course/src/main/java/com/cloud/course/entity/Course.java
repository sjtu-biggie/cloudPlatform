package com.cloud.course.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "COURSE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @Column(name = "ID")
    private String id;
    @Column(name = "USER_ID")
    private String user_id;
    @Column(name = "COURSE_NAME")
    private String course_name;
    @Column(name = "START_DATE")
    private Date start_date;
    @Column(name = "END_DATE")
    private Date end_date;
    @Column(name = "TYPE")
    private String type;
    @Column(name = "GRADE")
    private String grade;
}
