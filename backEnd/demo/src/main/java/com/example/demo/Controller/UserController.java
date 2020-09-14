package com.example.demo.Controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Service.UserService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {
    @Autowired(required = false)
    UserService userService;

    @RequestMapping("login")//login接口
    public String  login1(@RequestBody String postJson){
        System.out.println(postJson);
        JSONObject jsObject= JSONObject.parseObject(postJson);
        String username=jsObject.getString("username");
        String password=jsObject.getString("password");
        System.out.println(username+" "+password);
        String result = userService.login(username,password);
        return postJson;
    }
}
