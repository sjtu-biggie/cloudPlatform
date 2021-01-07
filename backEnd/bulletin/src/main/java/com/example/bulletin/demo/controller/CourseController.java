package com.example.bulletin.demo.controller;


import com.alibaba.fastjson.JSONObject;

import com.example.bulletin.demo.entity.CourseBulletin;
import com.example.bulletin.demo.service.BulletinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static java.lang.Integer.parseInt;

@CrossOrigin(origins = "*")
@RestController
public class CourseController {
    @Autowired
    private BulletinService bulletinService;
    
    @GetMapping(path = "/course/getPageBulletin")
//    @PreAuthorize("hasRole('ROLE_USER')")
    public Page<CourseBulletin> getPageBulletins(@RequestParam("courseId") String id, @RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable p = PageRequest.of(page,size);
        System.out.println("********** getWeibos **********");
        return bulletinService.getPageBulletin(id,p);
    }

    @GetMapping(path = "/course/getBulletin")
    public List<CourseBulletin> getBulletin(@RequestParam("courseId") String id) {
        System.out.println("bulletin get");
        return bulletinService.getBulletin(id);
    }

    @PostMapping(path = "/course/deleteBulletin")
    public void deleteBulletin(@RequestBody Map<String, String> params) {
        System.out.println("bulletin delete");
        String id = params.get("bulletinId");
        bulletinService.deleteBulletin(id);
    }
    @PostMapping(path = "/course/addBulletin")
    public void addBulletin(@RequestBody JSONObject object) {
        System.out.println("bulletin added");
        bulletinService.addBulletin(object);
    }
}
