package com.example.demo.model;

import lombok.Data;

@Data
public class User {
    private long id;
    private String username;
    private String password;

    public void setUserName(String name) {username=name;
    }
    public String getUsername(){
        return username;
    }

    public void setPassword(String pswd){
        password=pswd;
    }
    public String getPassword(){
        return password;
    }

    }
