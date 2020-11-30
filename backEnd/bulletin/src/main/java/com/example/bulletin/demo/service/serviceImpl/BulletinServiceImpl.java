package com.example.bulletin.demo.service.serviceImpl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.bulletin.demo.dao.BulletinDao;
import com.example.bulletin.demo.entity.CourseBulletin;
import com.example.bulletin.demo.service.BulletinService;
import com.fasterxml.jackson.annotation.JsonAlias;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.parseInt;


@Service
public class BulletinServiceImpl implements BulletinService {

    @Autowired
    private BulletinDao bulletinDao;

    @Override
    public Page<CourseBulletin> getPageBulletin(String id, Pageable p){
        int courseId = parseInt(id);
        return BulletinDao.getPageBulletin(courseId,p);
    }
    @Override
    public List<CourseBulletin> getBulletin(String id){
        int courseId = parseInt(id);
        return BulletinDao.getBulletin(courseId);
    }
    @Override
    public void addBulletin(JSONObject object){
        int courseId = parseInt(object.getString("courseId"));
        String title = object.getString("title");
        String content = object.getString("content");
        Date publish_date = new Date();
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String _publish_date = object.getString("publishDate");
        try {
            publish_date = sdf.parse(_publish_date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        CourseBulletin courseBulletin=new CourseBulletin(courseId,title,content,publish_date);
        BulletinDao.saveBulletin(courseBulletin);
    }
    @Override
    public void deleteBulletin(String id){
        int bulletinId = parseInt(id);
        CourseBulletin courseBulletin = BulletinDao.getOneBulletin(bulletinId);
        BulletinDao.deleteBulletin(courseBulletin);
    }
}
