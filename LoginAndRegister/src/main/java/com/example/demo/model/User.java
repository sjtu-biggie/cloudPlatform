package com.example.demo.model;

import lombok.Data;

import java.beans.Transient;

@Data
public class User {
    private String username;
    private String password;
    private String sid;
    private String email;
    private String telephone;
    private String nickname;
    private String type;
    private String theGrade;
    private String theClass;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTheGrade() {
        return theGrade;
    }

    public void setTheGrade(String theGrade) {
        this.theGrade = theGrade;
    }

    public String getTheClass() {
        return theClass;
    }

    public void setTheClass(String theClass) {
        this.theClass = theClass;
    }


    private UserIcon icon;
    @Transient
    public UserIcon getIcon(){return icon;}
    public void setIcon(UserIcon icon){this.icon=icon;}

    }
