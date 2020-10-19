package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.model.UserIcon;
import com.example.demo.repository.UserIconRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;


@Repository
public class LoginDao {
    @Autowired(required = false)
    private UserMapper userMapper;
    @Autowired(required = false)
    private UserIconRepository userIconRepository;


    public User getUserMessageAndIcon(@RequestBody JSONObject obj){
        userIconRepository.save(new UserIcon("fhasdh","gfajsgf"));
        System.out.println("进入Dao获取全部信息");
        String username = obj.getString("username");
        User user1 = userMapper.getUserMessage(username);
        System.out.println(username);
        UserIcon userIcon=userIconRepository.findByUsername(username);
        System.out.println(userIcon);
        user1.setIconBase64(userIcon.getIconBase64());
        System.out.println(user1);
        return user1;
    }

}
