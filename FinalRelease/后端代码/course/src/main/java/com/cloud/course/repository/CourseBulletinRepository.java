package com.cloud.course.repository;

import com.cloud.course.entity.CourseBulletin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CourseBulletinRepository extends JpaRepository<CourseBulletin,Integer> {
    List<CourseBulletin> findAllByCourseId(int id);

    CourseBulletin findCourseBulletinByBulletinId(int id);

    Page<CourseBulletin> findAllByCourseId(int courseId, Pageable p);
}
