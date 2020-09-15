
package com.example.demo.Entity;

        import com.fasterxml.jackson.annotation.JsonIdentityInfo;
        import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
        import com.fasterxml.jackson.annotation.ObjectIdGenerators;


        import javax.persistence.*;

@Entity
@Table(name = "user")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "userId")
public class User {
    //    @Id
//    @Column(name = "user_id")
    private int userId;

    private String username;
    private String password;


    @Id
    @Column(name = "user_id")
    public int getUserId() { return userId; }
    public void setUserId(int  id) { userId = id; }

    @Basic
    @Column(name = "username")
    public String getNickname() { return username; }
    public void setNickname(String name) { username = name; }

    @Basic
    @Column(name = "password")
    public String getPassword() { return password; }
    public void setPassword(String psw) { password = psw; }


}
