package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courseBulletin")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseBulletin {
    @Id
    private String id;
    private String bulletin;
    private Date publish_date;
}
