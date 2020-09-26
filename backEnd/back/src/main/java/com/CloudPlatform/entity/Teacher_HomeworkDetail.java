package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.Teacher_HomeworkMultiKeys;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="Teacher_HomeworkDetail")
@IdClass(Teacher_HomeworkMultiKeys.class)
@JsonIgnoreProperties(value = {"courseId","teacherId","homeworkId","hibernateLazyInitializer","fieldHandler"})
public class Teacher_HomeworkDetail implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "courseId")
    private String courseId;

    @Id
    @Column(name = "teacherId")
    private String teacherId;

    @Id
    @Column(name = "homeworkId")
    private String homeworkId;

    @Column(name = "Content")
    private String Content;

    @Transient
    @Column(name = "Answer")
    private String Answer;
}
