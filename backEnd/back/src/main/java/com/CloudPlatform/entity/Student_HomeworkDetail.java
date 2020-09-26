package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.Student_HomeworkMultiKeys;
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
@Document(collection="Student_HomeworkDetail")
@IdClass(Student_HomeworkMultiKeys.class)
@JsonIgnoreProperties(value = {"courseId","studentId","homeworkId","hibernateLazyInitializer","fieldHandler"})
public class Student_HomeworkDetail implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "courseId")
    private String courseId;

    @Id
    @Column(name = "studentId")
    private String studentId;

    @Id
    @Column(name = "homeworkId")
    private String homeworkId;

    @Transient
    @Column(name = "Content")
    private String Content;

    @Transient
    @Column(name = "Comment")
    private String Comment;
}
