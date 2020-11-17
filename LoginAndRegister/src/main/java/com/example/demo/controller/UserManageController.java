package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.model.UserIcon;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class UserManageController {
    @Autowired(required = false)
    private UserMapper userMapper;
    @Autowired(required = false)
    private LoginService loginService;

    private String defaultJpgTeacher="data:image/jpg;base64,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";
    private String defaultJpgStudent="data:image/jpg;base64,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";
    @RequestMapping(value = "/delUser",method = RequestMethod.POST)
    public String delUser(@RequestBody JSONObject obj){
        String username=obj.getString("name");
        userMapper.delUser(username);
        return "删除成功";
    }

    @RequestMapping(value = "/setUserType",method = RequestMethod.POST)
    public String setUserType(@RequestBody JSONObject obj){
        String username=obj.getString("username");
        String type=obj.getString("type");
        System.out.println("更改头像");
        if(type.equals("teacher")){
            System.out.println("开始设置老师头像");
            loginService.setUseIcon(new UserIcon(username, defaultJpgTeacher));
        }else if(type.equals("student")){
            loginService.setUseIcon(new UserIcon(username,defaultJpgStudent));
            System.out.println("开始设置学生头像");
        }
        try {
            userMapper.setUserType(username,type);
        }catch (Exception e){
            System.out.println(e);
        }
        return "更改完成";
    }

    @RequestMapping(value = "/getAllUsers",method = RequestMethod.POST)
    public List<User> getAllUsers(){
        List<User> users=userMapper.getAllUsers();
        System.out.println(users);
        return users;
    }

    @RequestMapping(value = "/getAllStudentsByClass",method = RequestMethod.POST)
    public List<User> getAllStudentsByClass(@RequestBody JSONObject obj){
        String theClass = obj.getString("range");
        List<User> users=userMapper.getAllStudentsByClass(theClass);
        return  users;
    }

    @RequestMapping(value = "/deleteStudentFromClass",method = RequestMethod.POST)
    public String deleteStudentFromClass(@RequestBody JSONObject obj){
        String username=obj.getString("username");
        userMapper.delStudentFromClass(username);
        return "已经从班级删除删除用户";
    }


    @RequestMapping(value="/getAllUsersByClassIds",method=RequestMethod.POST)
    public List<User> getAllUsersByClassIds(@RequestBody JSONObject obj){

        JSONArray classIds=obj.getJSONArray("classIds");
        System.out.println(classIds);
        List<User> users=new ArrayList<>();
        for(Object s:classIds){
            String classId=s.toString();
            List<User> tmp=userMapper.getAllStudentsByClass(classId);
            users.addAll(tmp);
        }
        System.out.println("获取全部学生完成");
        return users;
    }

    @RequestMapping(value = "/getUserBySid",method=RequestMethod.POST)
    public User getUserBySid(@RequestBody JSONObject obj){
        String sid= obj.getString("sid");
        User user=userMapper.getUserBySid(sid);
        return user;
    }

    @RequestMapping(value = "/getAllStudentsByTheClass",method = RequestMethod.POST)
    public List<User> getAllStudentsByTheClass(@RequestBody JSONObject obj){
        String theClass = obj.getString("theClass");
        List<User> users=userMapper.getAllStudentsByTheClass(theClass);
        return  users;
    }

    @RequestMapping(value = "/addStudentToClass",method = RequestMethod.POST)
    public String addStudentToClass(@RequestBody JSONObject obj){
        String username=obj.getString("username");
        String theClass=obj.getString("theClass");
        try{
            userMapper.addStudentToClass(username,theClass);
        }catch (Exception e){
            System.out.println(e);
        }
        return "添加完成";
    }



}
