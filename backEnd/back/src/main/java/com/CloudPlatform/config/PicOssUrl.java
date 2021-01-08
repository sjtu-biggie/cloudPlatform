package com.CloudPlatform.config;

import com.aliyun.com.viapi.FileUtils;
import com.aliyun.oss.ClientException;

import java.io.IOException;

public class PicOssUrl {
    public static void main(String[] args) throws IOException, ClientException, com.aliyuncs.exceptions.ClientException {
        String file = args[0];
        testUploadFile(file);
    }
    public static String testUploadFile(String file) throws ClientException, IOException, com.aliyuncs.exceptions.ClientException {
        String accessKey = "LTAI4G6u4Vad9GaYfLjy3ncD";
        String accessKeySecret = "g96N07QKeFydCSbXsFcgRbdsSex5Rk";
        FileUtils fileUtils = FileUtils.getInstance(accessKey,accessKeySecret);
        //String file = "https://fuss10.elemecdn.com/5/32/c17416d77817f2507d7fbdf15ef22jpeg.jpeg";
        String ossurl = fileUtils.upload(file);
        //System.out.println(ossurl);
        String ans = AssessSharpness.Assess(ossurl);
        return ans;

    }
}
