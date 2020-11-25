package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.StudentHomeworkMultiKeys;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Document(collection="STUDENTHOMEWORKDETAIL")
//@IdClass(StudentHomeworkMultiKeys.class)
@Transactional
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
public class StudentHomeworkDetail implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "_ID")
    private String id;

    @Column(name = "STUDENTID")
    private String studentId;

    @Column(name = "HOMEWORKID")
    private String homeworkId;

    @Column(name = "COURSEID")
    private String courseId;

    @Transient
    @Column(name = "CONTENT")
    private String Content;

    @Transient
    @Column(name = "CORRECT")
    private String Correct;

    @Transient
    @Column(name = "COMMENT")
    private String Comment;

    @Transient
    @Column(name = "REMARKS")
    private String Remarks;

    @Transient
    @Column(name = "UPLOAD")
    private String Upload;

    @Transient
    @Column(name = "OCONTENT")
    private JSONObject ocontent;
}
