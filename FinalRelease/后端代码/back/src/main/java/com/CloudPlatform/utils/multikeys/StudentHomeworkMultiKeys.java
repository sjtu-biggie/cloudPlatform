//package com.CloudPlatform.utils.multikeys;
//
//public class StudentHomeworkMultikeys {
//}
package com.CloudPlatform.utils.multikeys;

import java.io.Serializable;
import java.util.Objects;

public class StudentHomeworkMultiKeys implements Serializable {
    private String studentId;
    private int homeworkId;

    public StudentHomeworkMultiKeys() {
    }

    public StudentHomeworkMultiKeys(String studentId, int homeworkId) {
        this.studentId = studentId;
        this.homeworkId = homeworkId;
    }


    public String getStudent_id() {
        return studentId;
    }
    public void setStudent_id(String studentId) {
        this.studentId = studentId;
    }

    public int getHomeworkId() {
        return homeworkId;
    }
    public void setHomeworkId(int homeworkId) {
        this.homeworkId = homeworkId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentHomeworkMultiKeys)) return false;
        StudentHomeworkMultiKeys that = (StudentHomeworkMultiKeys) o;
        return Objects.equals(getStudent_id(), that.getStudent_id()) &&
                Objects.equals(getHomeworkId(), that.getHomeworkId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getHomeworkId(), getStudent_id());
    }
}
