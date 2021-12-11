package com.spring.socialising.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_invoice")
public class PurchaseInvoiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long id_account;

    private String code;

    private LocalDateTime created_time;

    private BigDecimal total_price;

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

    public BigDecimal getTotal_price() {
        return total_price;
    }

    public void setTotal_price(BigDecimal total_price) {
        this.total_price = total_price;
    }
}
