package com.cloud.course.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.bind.annotation.CrossOrigin;

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
    private int id;
    @Column(name = "USER_ID")
    private String userId;
    @Column(name = "COURSE_NAME")
    private String courseName;
    @Column(name = "START_DATE")
    private Date startDate;
    @Column(name = "END_DATE")
    private Date endDate;
    @Column(name = "TYPE")
    private String type;
    @Column(name = "GRADE")
    private String grade;
    @Column(name = "CLASSES")
    private String classes;
    @Column(name = "NOTE_HOMEWORK_ASSIGN")
    private boolean noteHomeworkAssign;
    @Column(name = "NOTE_HOMEWORK_DUE")
    private boolean noteHomeworkDue;
    @Column(name = "NOTE_HOMEWORK_RATIFY")
    private boolean noteHomeworkRatify;
    @Column(name = "SEE_COURSE_AVERAGE")
    private boolean seeCourseAverage;
    @Column(name = "seeHomeworkAverage")
    private boolean seeHomeworkAverage;

    public Course(String _user_id,String _course_name,Date _start_date,Date _end_date,String _type,String _grade
        ,String _classes,boolean _noteHomeworkAssign,boolean _noteHomeworkDue,boolean _noteHomeworkRatify
        ,boolean _seeCourseAverage,boolean _seeHomeworkAverage){
        userId=_user_id;
        courseName=_course_name;
        startDate=_start_date;
        endDate=_end_date;
        type=_type;
        grade=_grade;
        classes=_classes;
        noteHomeworkAssign=_noteHomeworkAssign;
        noteHomeworkDue=_noteHomeworkDue;
        noteHomeworkRatify=_noteHomeworkRatify;
        seeCourseAverage=_seeCourseAverage;
        seeHomeworkAverage=_seeHomeworkAverage;
    }
}
