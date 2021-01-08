package com.CloudPlatform.config;

import com.baidu.aip.imageprocess.AipImageProcess;
import org.json.JSONObject;

import java.util.HashMap;

public class PicReinforce {
    //设置APPID/AK/SK
    public static final String APP_ID = "23503031";
    public static final String API_KEY = "OlOpEAbdWLBVwaH5eoQiS75T";
    public static final String SECRET_KEY = "8QV8RYPAc4ZDRpwDE7Vc2R37SZrUs84x";

    public static void main(String[] args) {
        // 初始化一个AipImageProcess
        AipImageProcess client = new AipImageProcess(APP_ID, API_KEY, SECRET_KEY);

        // 可选：设置网络连接参数
//        client.setConnectionTimeoutInMillis(2000);
//        client.setSocketTimeoutInMillis(60000);

        // 可选：设置代理服务器地址, http和socket二选一，或者均不设置
//        client.setHttpProxy("proxy_host", proxy_port);  // 设置http代理
//        client.setSocketProxy("proxy_host", proxy_port);  // 设置socket代理

        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>();

        // 参数为二进制数组
        String image = "test.jpg";
        JSONObject res = client.imageDefinitionEnhance(image, options);
        System.out.println(res.toString(2));
    }

    public static String Reinforce(byte[] file){
        AipImageProcess client = new AipImageProcess(APP_ID, API_KEY, SECRET_KEY);

        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>();

        // 参数为二进制数组
        JSONObject res = client.imageDefinitionEnhance(file, options);
        //System.out.println(res.toString(2));
        return res.toString(2);


    }
}
