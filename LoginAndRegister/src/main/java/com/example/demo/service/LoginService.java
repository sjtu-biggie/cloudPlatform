package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.LoginDao;
import com.example.demo.model.User;
import com.example.demo.model.UserIcon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


@Service
public class LoginService {
    @Autowired(required = false)
    private LoginDao loginDao;

    public User getUserMessageAndIcon(@RequestBody JSONObject obj){
        System.out.println("进入Service获取全部信息");
        return loginDao.getUserMessageAndIcon(obj);
    }

    public String getUserIcon(String username){
        System.out.println("进入service获取头像");
        return loginDao.getUserIcon(username);
    }

    public boolean setUseIcon(UserIcon userIcon){
        System.out.println("进入Service储存用户头像"+userIcon);
        return loginDao.setUserIcon(userIcon);
    }
}
