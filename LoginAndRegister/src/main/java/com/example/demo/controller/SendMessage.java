package com.example.demo.controller;


import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;


/**
 * 发送短信
 * @since 1.8
 * @author zf
 * @version 1.8
 */
@CrossOrigin(origins = "*")
@RestController
public class SendMessage {


    /**
     * 给指定手机号码发送短信验证码
     * @param to 手机号码
     * @return 验证码
     */
    @RequestMapping(value = "/sendMessage",method = RequestMethod.POST)
    public String sendMessage(String to){
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "***", "***");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("dysmsapi.aliyuncs.com");
        request.setSysVersion("2017-05-25");
        request.setSysAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        request.putQueryParameter("PhoneNumbers", to);
        request.putQueryParameter("SignName", "云作业平台");
        request.putQueryParameter("TemplateCode", "SMS_202823359");
        String code=getCode();
        request.putQueryParameter("TemplateParam","{\"code\":"+code+"}" );
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
        return  code;
    }

    /**
     * 生成一个六位随机验证码
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
