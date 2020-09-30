package com.cloud.course.repository;

import com.cloud.course.entity.Notification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface NoteRepository extends CrudRepository<Notification,String> {

    List<Notification> findAllByReceiverId(String id);
    List<Notification> findAllBySenderId(String id);

    @Transactional
    @Modifying
    void deleteByReceiverId(String id);

    @Transactional
    @Modifying
    void deleteBySenderId(String id);

    @Transactional
    @Modifying
    void deleteByNotificationId(int id);

}
