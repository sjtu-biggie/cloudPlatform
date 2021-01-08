package com.example.demo.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

/**
 * 发送邮件
 * @since 1.8
 * @author zf
 * @version 1.8
 */
@CrossOrigin(origins = "*")
@RestController
public class SendEmail {
    @Autowired(required = false)
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String from;
    private String subject="学易-云作业平台";

    /**
     * 注册时发送验证码使用
     * @param to 用户的邮箱
     * @return 返回生成的验证码
     */
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

    /**
     * 生成一个随机的六位验证码
     * @return String 验证码
     */
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