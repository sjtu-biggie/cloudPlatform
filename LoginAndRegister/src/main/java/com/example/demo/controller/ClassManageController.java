package com.example.demo.controller;

import com.example.demo.Mapper.ClassManageMapper;
import com.example.demo.model.ClassManage;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
public class ClassManageController {
    @Autowired(required = false)
    private ClassManageMapper classManageMapper;

    @RequestMapping(value = "/addClass",method = RequestMethod.POST)
    public String addClass(@RequestBody JSONObject obj){
        String classNo=obj.getString("classNo");
        int number=obj.getIntValue("number");
        String classManager=obj.getString("classManager");
        ClassManage classManage=new ClassManage();
        classManage.setClassNo(classNo);
        classManage.setNumber(number);
        classManage.setClassManagers(classManager);
        classManageMapper.addClass(classManage);
        return "添加班级成功";
    }

    @RequestMapping(value = "/getClass",method = RequestMethod.POST)
    public String getClass(@RequestBody JSONObject obj){
        String getId=obj.getString("id");
        String getclassNo=obj.getString("classNo");
        ClassManage classManage=classManageMapper.getClass(getId,getclassNo);
        if (classManage!=null)
        {
            return  "找到这样的班级";
        }
        else {
            return "没有这样的班级";
        }
    }

    @RequestMapping(value = "/updateClass",method = RequestMethod.POST)
    public String updateClass(@RequestBody JSONObject obj){
        String classNo=obj.getString("classNo");
        int n=obj.getIntValue("number");
        classManageMapper.updateClass(classNo,n);
        return "成功增加学生人数";
    }


    @RequestMapping(value = "/getAllClassByManager",method = RequestMethod.POST)
    public List<ClassManage> getAllClassByManager(@RequestBody JSONObject obj){
        String sid= obj.getString("sid");
        List<ClassManage> theClassIds=classManageMapper.getAllClassByManager(sid);
        return theClassIds;
    }

}
