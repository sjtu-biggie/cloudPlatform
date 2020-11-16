package com.example.demo.Mapper;

import com.example.demo.model.ClassManage;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ClassManageMapper {
    @Insert("insert into classmanage (id,number,classNo,classManagers) values (#{id},#{number},#{classNo},#{classManagers})")
    public void addClass(ClassManage classManage);

    @Select("select * from classmanage where id=#{getId} and classNo = #{getclassNo}")
    public ClassManage getClass(String getId,String getclassNo);

    @Update("update classmanage set number=number+ #{n} where classNo=#{classNo}")
    public void updateClass(String classNo,int n);

    @Update("update classManage set classManagers=classManagers+#{classManagers} and number=number+#{n} where id=#{getId}")
    public void addClassManagers(String getId,String classManagers,int n);

    @Select("select classNo from classmanage where classManagers=#{sid}")
    List<ClassManage> getAllClassByManager(String sid);

    @Select("select classNo from classmanage")
    List<String> getAllClass();
}
