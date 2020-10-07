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
