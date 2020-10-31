package com.CloudPlatform.entity;

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
    @Column(name = "ANSWER")
    private String Answer;

    @Transient
    @Column(name = "CONTENTUPLOAD")
    private String ContentUpload;

    @Transient
    @Column(name = "ANSWERUPLOAD")
    private String AnswerUpload;
}
