package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
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

    @RequestMapping(value = "/delUser",method = RequestMethod.POST)
    public String delUser(@RequestBody JSONObject obj){
        String username=obj.getString("name");
        userMapper.delUser(username);
        return "Fsadf";
    }

    @RequestMapping(value = "/setUserType",method = RequestMethod.POST)
    public String setUserType(@RequestBody JSONObject obj){
        String username=obj.getString("username");
        String type=obj.getString("type");
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
        userMapper.delUser(username);
        return "已经删除用户";
    }


    @RequestMapping(value="/getAllUsersByClassIds",method=RequestMethod.POST)
    public List<User> getAllUsersByClassIds(@RequestBody JSONObject obj){

        JSONArray classIds=obj.getJSONArray("classIds");
        System.out.println(classIds);
        List<User> users=new ArrayList<>();
        for(Object s:classIds){
            String classId=s.toString();
            List<User> tmp=userMapper.getAllStudentsByClass(classId);
            System.out.println(tmp);
            users.addAll(tmp);
        }
        System.out.println(users);
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
