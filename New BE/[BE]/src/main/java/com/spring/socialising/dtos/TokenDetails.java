package com.spring.socialising.dtos;

import java.util.ArrayList;
import java.util.List;

public class TokenDetails {

    private String fullName;

    private String token;

    private String id;

    private long expired;

    private List<String> roles = new ArrayList<>();

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getExpired() {
        return expired;
    }

    public void setExpired(long expired) {
        this.expired = expired;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
