package com.example.demo.Service;

import com.example.demo.Dao.UserDao;
import com.example.demo.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired(required = false)
    UserDao userDao;

    public String login(String username,String password) {
        User getUser=userDao.getUserByName(username);
        if (getUser==null)
            return "NO SUCH USER";
        if (password.equals(getUser.getPassword()))
            return "EXIST";
        return "WRONG PASSWORD";
    }
}
