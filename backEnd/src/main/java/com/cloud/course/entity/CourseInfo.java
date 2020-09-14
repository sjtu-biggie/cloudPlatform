package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "courseInfo")
@AllArgsConstructor
@NoArgsConstructor
public class CourseInfo {
    @Id
    private String id;
    private String introduction;
    private String syllabus;
    private String textbook;
}
