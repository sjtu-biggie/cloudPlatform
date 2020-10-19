package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.LoginDao;
import com.example.demo.model.User;
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
}
