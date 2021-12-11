package com.spring.socialising.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @JsonIgnore
    private String password;

    private String role = new String();

    private boolean is_active = true;

    @JsonIgnore
    @CreatedDate
    private LocalDateTime created_time;

    @JsonIgnore
    @LastModifiedDate
    private LocalDateTime modified_time;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean is_active() {
        return is_active;
    }

    public void set_active(boolean is_active) {
        this.is_active = is_active;
    }

    public LocalDateTime getCreated_time() {
        return created_time;
    }

    public void setCreated_time(LocalDateTime created_time) {
        this.created_time = created_time;
    }

    public LocalDateTime getModified_time() {
        return modified_time;
    }

    public void setModified_time(LocalDateTime modified_time) {
        this.modified_time = modified_time;
    }
}
