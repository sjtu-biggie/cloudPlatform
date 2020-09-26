package com.CloudPlatform.utils.multikeys;

import java.io.Serializable;
import java.util.Objects;

public class Teacher_HomeworkMultiKeys implements Serializable {
    private String courseId;
    private String teacherId;
    private String homeworkId;

    public Teacher_HomeworkMultiKeys() {
    }

    public Teacher_HomeworkMultiKeys(String courseId, String teacherId, String homeworkId) {
        this.courseId = courseId;
        this.teacherId = teacherId;
        this.homeworkId = homeworkId;
    }

    public String getCourseId() {
        return courseId;
    }
    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getteacherId() {
        return teacherId;
    }
    public void setteacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getHomeworkId() {
        return homeworkId;
    }
    public void setHomeworkId(String homeworkId) {
        this.homeworkId = homeworkId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Teacher_HomeworkMultiKeys)) return false;
        Teacher_HomeworkMultiKeys that = (Teacher_HomeworkMultiKeys) o;
        return Objects.equals(getCourseId(), that.getCourseId()) &&
                Objects.equals(getteacherId(), that.getteacherId()) &&
                Objects.equals(getHomeworkId(), that.getHomeworkId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getHomeworkId(), getteacherId(), getCourseId());
    }
}
