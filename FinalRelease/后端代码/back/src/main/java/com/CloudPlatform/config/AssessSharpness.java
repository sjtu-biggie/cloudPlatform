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
        DefaultProfile profile = DefaultProfile.getProfile("cn-shanghai", "", "g96N07QKeFydCSbXsFcgRbdsSex5Rk");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("imageenhan.cn-shanghai.aliyuncs.com");
        request.setSysVersion("2019-09-30");
        request.setSysAction("AssessSharpness");
        request.putQueryParameter("RegionId", "cn-shanghai");
        request.putQueryParameter("ImageURL", "");
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
        DefaultProfile profile = DefaultProfile.getProfile("cn-shanghai", "", "g96N07QKeFydCSbXsFcgRbdsSex5Rk");
        IAcsClient client = new DefaultAcsClient(profile);

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
