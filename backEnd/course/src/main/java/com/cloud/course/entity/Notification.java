package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@IdClass(NoteKeys.class)
@Entity
@Table(name = "STUDENT_NOTIFICATION")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @Column(name = "RECEIVER_ID")
    private String receiverId;
    @Id
    @Column(name = "SENDER_ID")
    private String senderId;
    @Column(name = "TITLE")
    private String title;
    @Column(name = "PUBLISH_DATE")
    private Date publishDate;
    @Column(name = "READING")
    private boolean reading;
    @Column(name = "CONTENT")
    private String content;
}
