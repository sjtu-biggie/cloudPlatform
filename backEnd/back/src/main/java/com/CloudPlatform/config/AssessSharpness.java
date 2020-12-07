package com.CloudPlatform.config;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;

public class AssessSharpness {
    public static void main(String[] args) {
        DefaultProfile profile = DefaultProfile.getProfile("cn-shanghai", "LTAI4G6u4Vad9GaYfLjy3ncD", "g96N07QKeFydCSbXsFcgRbdsSex5Rk");
        IAcsClient client = new DefaultAcsClient(profile);

        //String arg = "https://lebronq.oss-cn-shanghai.aliyuncs.com/WechatIMG859.jpeg?Expires=1607323833&OSSAccessKeyId=TMP.3Keo3FCA5fAjg8AJaEMR6nLfUxCtSk4R42wQWsqJSRGXfosXVg9kPrQq4aCRtxATv3TRVFKyTEgoX5bEaQEteKp1rejifs&Signature=tejzb%2F2EiuNWYVbNI6RzU9M23qU%3D";

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("imageenhan.cn-shanghai.aliyuncs.com");
        request.setSysVersion("2019-09-30");
        request.setSysAction("AssessSharpness");
        request.putQueryParameter("RegionId", "cn-shanghai");
        request.putQueryParameter("ImageURL", "http://viapi-customer-temp.oss-cn-shanghai.aliyuncs.com/LTAI4G6u4Vad9GaYfLjy3ncD/20757cd1-b5e6-4c93-af66-11a371fc5b871607326785852WechatIMG859.jpeg");
        //request.putQueryParameter("ImageURL", arg);
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
    }
    public static String Assess(String ossurl) {
        DefaultProfile profile = DefaultProfile.getProfile("cn-shanghai", "LTAI4G6u4Vad9GaYfLjy3ncD", "g96N07QKeFydCSbXsFcgRbdsSex5Rk");
        IAcsClient client = new DefaultAcsClient(profile);

        //String arg = "http://viapi-customer-temp.oss-cn-shanghai.aliyuncs.com/LTAI4G6u4Vad9GaYfLjy3ncD/20757cd1-b5e6-4c93-af66-11a371fc5b871607326785852WechatIMG859.jpeg";

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("imageenhan.cn-shanghai.aliyuncs.com");
        request.setSysVersion("2019-09-30");
        request.setSysAction("AssessSharpness");
        request.putQueryParameter("RegionId", "cn-shanghai");
        request.putQueryParameter("ImageURL", ossurl);
        //request.putQueryParameter("ImageURL", arg);
        try {
            CommonResponse response = client.getCommonResponse(request);
            //System.out.println(response.getData());
            return response.getData();
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
        return ossurl;
    }
}
