package com.CloudPlatform.entity;

import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Transactional
@Document(collection="TEACHERHOMEWORKDETAIL")

public class TeacherHomeworkDetail implements Serializable {
    private static final long serialVersionUID = 1L;

    public TeacherHomeworkDetail(String _homeworkId, String _courseId, String _teacherId, String _content,
             JSONObject _syllabus, String _answer, String _contentupload, String _answerupload){
        homeworkId = _homeworkId;
        courseId = _courseId;
        teacherId = _teacherId;
        Content = _content;
        syllabus = _syllabus;
        Answer = _answer;
        ContentUpload = _contentupload;
        AnswerUpload = _answerupload;
    }

    @Column(name = "HOMEWORKID")
    private String homeworkId;

    @Id
    @Column(name = "_ID")
    private String id;

    @Column(name = "COURSEID")
    private String courseId;

    @Column(name = "TEACHERID")
    private String teacherId;

    @Column(name = "CONTENT")
    private String Content;

    @Transient
    @Column(name = "SYLLABUS")
    private JSONObject syllabus;

    @Transient
    @Column(name = "ANSWER")
    private String Answer;

    @Transient
    @Column(name = "CONTENTUPLOAD")
    private String ContentUpload;

    @Transient
    @Column(name = "ANSWERUPLOAD")
    private String AnswerUpload;
}
