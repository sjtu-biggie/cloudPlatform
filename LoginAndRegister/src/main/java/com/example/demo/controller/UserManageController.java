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
        System.out.println("从班级中删除学生"+username);
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

}
