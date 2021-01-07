package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
public class SendEmail {
    @Autowired(required = false)
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String from;
    private String subject="学易-云作业平台";

    @RequestMapping(value = "/sendNotice",method= RequestMethod.POST)
    public String sendNotice(@RequestBody JSONObject obj){
        JSONArray tos=obj.getJSONArray("tos");
        System.out.println(tos);
        String context= obj.getString("context");
        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
        simpleMailMessage.setText(context);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setFrom(from);
        for (Object s:tos){
            String to=s.toString();
            System.out.println(to);
            simpleMailMessage.setTo(to);
            javaMailSender.send(simpleMailMessage);
        }
        return "发送完成";
    }
}

//        for(Object s:classIds){
//                String classId=s.toString();
//                List<User> tmp=userMapper.getAllStudentsByClass(classId);
//        System.out.println(tmp);
//        users.addAll(tmp);
//        }