package com.example.demo.model;

import lombok.Data;

@Data
public class ClassManage {
    private String id;
    private int number;
    private String classNo;
    private String classManagers;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getClassNo() {
        return classNo;
    }

    public void setClassNo(String classNo) {
        this.classNo = classNo;
    }

    public String getClassManagers() {
        return classManagers;
    }

    public void setClassManagers(String classManagers) {
        this.classManagers = classManagers;
    }

}
