package com.cloud.course.entity;

import lombok.Data;

import java.io.Serializable;

@Data

public class StudentCourseInfoKeys implements Serializable {
    private String userId;
    private Integer courseId;
}
