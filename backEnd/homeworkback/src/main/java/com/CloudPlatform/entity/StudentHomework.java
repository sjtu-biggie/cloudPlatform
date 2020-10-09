package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.StudentHomeworkMultiKeys;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "STUDENTHOMEWORK")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(StudentHomeworkMultiKeys.class)
public class StudentHomework {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "STUDENTID",length = 16)
    private String studentId;

    @Id
    @Column(name = "HOMEWORKID",length = 16)
    private int homeworkId;

    @Column(name = "COURSEID",length = 16)
    private int courseId;

    @Column(name = "NICKNAME")
    private String nickName;

    @Column(name = "HANDINTIME")
    private Date HandinTime;

    @Column(name = "STARTTIME")
    private Date StartTime;

    @Column(name = "ENDTIME")
    private Date EndTime;

    @Column(name = "SCORE")
    private Double Score;

    @Transient
    @Column(name = "CONTENT")
    private String Content;

    @Transient
    @Column(name = "COMMENT")
    private String Comment;

    @Transient
    @Column(name = "REMARKS")
    private String Remarks;
}
