package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Document(collection = "courseBulletin")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseBulletin {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "BULLETIN_ID")
    private int bulletinId;
    @Column(name = "COURSE_ID")
    private int courseId;
    @Column(name = "TITLE")
    private String title;
    @Column(name = "CONTENT")
    private String content;
    @Column(name = "PUBLISH_DATE")
    private Date publishDate;
}
