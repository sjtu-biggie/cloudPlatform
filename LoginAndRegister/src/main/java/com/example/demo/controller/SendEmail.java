package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
public class SendEmail {
    @Autowired(required = false)
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String from;
    private String subject="学易-云作业平台";
    @RequestMapping("/sendEmail")
    public String send(String to){
        String code=getCode();
        String context="你的验证码为"+code;
        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
        simpleMailMessage.setText(context);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setFrom(from);
        javaMailSender.send(simpleMailMessage);
        return code;
    }

    private String getCode(){
        String result="";
        Random random=new Random();
        for (int i=0;i<6;++i)
        {
            result+=random.nextInt(10);
        }
        return result;
    }
}
