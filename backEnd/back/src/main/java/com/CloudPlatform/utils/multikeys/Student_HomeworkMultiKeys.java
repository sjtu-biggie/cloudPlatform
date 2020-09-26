package com.CloudPlatform.utils.multikeys;

import java.io.Serializable;
import java.util.Objects;

public class Student_HomeworkMultiKeys implements Serializable {
    private String courseId;
    private String studentId;
    private String homeworkId;

    public Student_HomeworkMultiKeys() {
    }

    public Student_HomeworkMultiKeys(String courseId, String studentId, String homeworkId) {
        this.courseId = courseId;
        this.studentId = studentId;
        this.homeworkId = homeworkId;
    }

    public String getCourseId() {
        return courseId;
    }
    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getStudent_id() {
        return studentId;
    }
    public void setStudent_id(String studentId) {
        this.studentId = studentId;
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
        if (!(o instanceof Student_HomeworkMultiKeys)) return false;
        Student_HomeworkMultiKeys that = (Student_HomeworkMultiKeys) o;
        return Objects.equals(getCourseId(), that.getCourseId()) &&
                Objects.equals(getStudent_id(), that.getStudent_id()) &&
                Objects.equals(getHomeworkId(), that.getHomeworkId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getHomeworkId(), getStudent_id(), getCourseId());
    }
}
