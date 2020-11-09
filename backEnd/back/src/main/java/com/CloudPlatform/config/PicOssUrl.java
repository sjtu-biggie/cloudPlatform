package com.CloudPlatform.config;

import com.aliyun.com.viapi.FileUtils;
import com.aliyun.oss.ClientException;

import java.io.IOException;

public class PicOssUrl {
    public static void main(String[] args) throws IOException, ClientException, com.aliyuncs.exceptions.ClientException {
        testUploadFile();
    }
    public static void testUploadFile() throws ClientException, IOException, com.aliyuncs.exceptions.ClientException {
        String accessKey = "xxx";
        String accessKeySecret = "xxx";
        //String file = /home/admin/file/1.jpg  或者本地上传
        String file = "https://fuss10.elemecdn.com/5/32/c17416d77817f2507d7fbdf15ef22jpeg.jpeg";
        FileUtils fileUtils = FileUtils.getInstance(accessKey,accessKeySecret);
        String ossurl = fileUtils.upload(file);
        System.out.println(ossurl);
    }
}
