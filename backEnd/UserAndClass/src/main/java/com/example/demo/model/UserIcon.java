package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "userIcon")
public class UserIcon {
    @Id
    private String username;
    private String iconBase64;

    public UserIcon(String username,String iconBase64){
        this.username=username;
        this.iconBase64=iconBase64;
    }

    public String getIconBase64(){return iconBase64;}
    public void setIconBase64(String iconBase64){this.iconBase64=iconBase64;}

}
