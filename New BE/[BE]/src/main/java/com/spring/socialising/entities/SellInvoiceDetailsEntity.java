package com.spring.socialising.entities;

import javax.persistence.*;

@Entity
@Table(name = "sell_invoice_details")
public class SellInvoiceDetailsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long id_sell;

    private Long id_product;

    private String code;

    private Integer amount;

    private float price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId_sell() {
        return id_sell;
    }

    public void setId_sell(Long id_sell) {
        this.id_sell = id_sell;
    }

    public Long getId_product() {
        return id_product;
    }

    public void setId_product(Long id_product) {
        this.id_product = id_product;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
