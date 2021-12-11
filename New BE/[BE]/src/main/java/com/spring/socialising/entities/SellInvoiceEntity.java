package com.spring.socialising.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sell_invoice")
public class SellInvoiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long id_account;

    private Long id_customer;

    private String code;

    private LocalDateTime created_time;

    private Integer status;

    private float total_price;

    private String promotion_code;

    private float promotion_price;

    private float final_price;

    private String receive_name;

    private String receive_phone_number;

    private String receive_address;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId_account() {
        return id_account;
    }

    public void setId_account(Long id_account) {
        this.id_account = id_account;
    }

    public Long getId_customer() {
        return id_customer;
    }

    public void setId_customer(Long id_customer) {
        this.id_customer = id_customer;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDateTime getCreated_time() {
        return created_time;
    }

    public void setCreated_time(LocalDateTime created_time) {
        this.created_time = created_time;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public float getTotal_price() {
        return total_price;
    }

    public void setTotal_price(float total_price) {
        this.total_price = total_price;
    }

    public String getPromotion_code() {
        return promotion_code;
    }

    public void setPromotion_code(String promotion_code) {
        this.promotion_code = promotion_code;
    }

    public float getPromotion_price() {
        return promotion_price;
    }

    public void setPromotion_price(float promotion_price) {
        this.promotion_price = promotion_price;
    }

    public float getFinal_price() {
        return final_price;
    }

    public void setFinal_price(float final_price) {
        this.final_price = final_price;
    }

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
}
