package com.example.bulletin.demo.dao.daoImpl;

import com.example.bulletin.demo.dao.BulletinDao;
import com.example.bulletin.demo.entity.CourseBulletin;
import com.example.bulletin.demo.repository.CourseBulletinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.parseInt;


@Repository
public class BulletinDaoImpl implements BulletinDao {
    @Autowired
    private CourseBulletinRepository courseBulletinRepository;

    @Override
    public List<CourseBulletin> getBulletin(int id){
        return courseBulletinRepository.findAllByCourseId(id);
    }

    @Override
    public void saveBulletin(CourseBulletin courseBulletin){
        courseBulletinRepository.save(courseBulletin);
    }

    @Override
    public  CourseBulletin getOneBulletin(int bulletinId){
        return courseBulletinRepository.findCourseBulletinByBulletinId(bulletinId);
    }
    @Override
    public void deleteBulletin(CourseBulletin courseBulletin){
        courseBulletinRepository.delete(courseBulletin);
    }

    @Override
    public Page<CourseBulletin> getPageBulletin(int courseId, Pageable p) {
        return courseBulletinRepository.findAllByCourseId(courseId, p);
    }
}
