package com.example.bulletin.demo.dao;


import com.example.bulletin.demo.entity.CourseBulletin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface BulletinDao {
    List<CourseBulletin> getBulletin(int id);

    void saveBulletin(CourseBulletin courseBulletin);

    CourseBulletin getOneBulletin(int bulletinId);

    void deleteBulletin(CourseBulletin courseBulletin);

    Page<CourseBulletin> getPageBulletin(int courseId, Pageable p);
}
