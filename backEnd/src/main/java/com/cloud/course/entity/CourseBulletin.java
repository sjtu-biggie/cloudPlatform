package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "COURSEBULLETIN")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseBulletin {
    @Id
    @Column(name = "ID")
    private String id;
    @Column(name = "BULLETIN")
    private String bulletin;
    @Column(name = "PUBLISH_DATE")
    private Date publish_date;
    @Column(name = "ASSESSMENT")
    private String aasessment;
}
