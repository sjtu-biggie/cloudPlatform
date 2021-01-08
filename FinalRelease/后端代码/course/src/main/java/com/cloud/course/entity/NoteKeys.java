package com.cloud.course.entity;

import lombok.Data;

import java.io.Serializable;

@Data

public class NoteKeys implements Serializable {
    private String senderId;
    private String receiverId;
}
