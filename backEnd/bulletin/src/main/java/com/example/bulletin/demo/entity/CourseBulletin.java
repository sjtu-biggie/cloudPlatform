package com.example.bulletin.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Entity
@Table(name = "COURSE_BULLETIN")
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

    public CourseBulletin(int _courseId,String _title,String _content,Date _publishDate){
        courseId=_courseId;
        title=_title;
        content=_content;
        publishDate=_publishDate;
    }
}
