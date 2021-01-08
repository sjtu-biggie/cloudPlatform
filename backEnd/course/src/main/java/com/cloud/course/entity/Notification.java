package com.cloud.course.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "STUDENT_NOTIFICATION")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "NOTIFICATION_ID")
    private int notificationId;
    @Column(name = "RECEIVER_ID")
    private String receiverId;
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

    public Notification(String _receiverId,String _senderId,String _title,Date _publishDate,boolean _reading,String _content){
        receiverId=_receiverId;
        senderId=_senderId;
        title=_title;
        publishDate=_publishDate;
        reading=_reading;
        content=_content;
    }
}


