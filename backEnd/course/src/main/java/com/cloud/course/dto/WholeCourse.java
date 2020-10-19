package com.cloud.course.dto;
import com.cloud.course.entity.Course;
import com.cloud.course.entity.CourseInfo;
import com.cloud.course.entity.CoursePic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WholeCourse {
    Course course;
    CourseInfo courseInfo;
    CoursePic coursePic;
    Integer page;
}
