package com.example.bulletin.demo.service;


import com.alibaba.fastjson.JSONObject;
import com.example.bulletin.demo.entity.CourseBulletin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BulletinService {
    List<CourseBulletin> getBulletin(String id);

    void addBulletin(JSONObject object);

    void deleteBulletin(String id);

    Page<CourseBulletin> getPageBulletin(String id, Pageable p);

}
