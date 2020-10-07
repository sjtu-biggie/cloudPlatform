package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "coursePic")
@AllArgsConstructor
@NoArgsConstructor
public class CoursePic {
    @Id
    private int id;
    private String pic;
}
