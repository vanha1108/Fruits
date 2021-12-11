package com.spring.socialising.dtos;

import com.spring.socialising.entities.ProductEntity;

import java.util.List;

public class OrderDTO {
    private String receive_name;

    private String receive_phone_number;

    private String receive_address;

    private String promotion_code;

    private List<ProductEntity> product_list;

    public String getReceive_name() {
        return receive_name;
    }

    public void setReceive_name(String receive_name) {
        this.receive_name = receive_name;
    }

    public String getReceive_phone_number() {
        return receive_phone_number;
    }

    public void setReceive_phone_number(String receive_phone_number) {
        this.receive_phone_number = receive_phone_number;
    }

    public String getReceive_address() {
        return receive_address;
    }

    public void setReceive_address(String receive_address) {
        this.receive_address = receive_address;
    }

    public String getPromotion_code() {
        return promotion_code;
    }

    public void setPromotion_code(String promotion_code) {
        this.promotion_code = promotion_code;
    }

    public List<ProductEntity> getProduct_list() {
        return product_list;
    }

    public void setProduct_list(List<ProductEntity> product_list) {
        this.product_list = product_list;
    }
}
