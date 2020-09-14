package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "COURSEINFO")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseInfo {
    @Id
    @Column(name = "ID")
    private String id;
    @Column(name = "INTRODUCTION")
    private String introduction;
    @Column(name = "SYLLABUS")
    private String syllabus;
    @Column(name = "TEXTBOOK")
    private String textbook;
    @Column(name = "ASSESSMENT")
    private String assessment;
}
