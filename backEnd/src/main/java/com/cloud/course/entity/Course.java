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
    @Column(name = "TEACHER")
    private String teacher;
    @Column(name = "COURSE_NAME")
    private String course_name;
    @Column(name = "START_DATE")
    private Date start_date;
    @Column(name = "END_DATE")
    private Date end_date;

    @Transient
    @Column(name = "PIC")
    private String pic;
}
