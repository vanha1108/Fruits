package com.spring.socialising.entities;

import javax.persistence.*;

@Entity
@Table(name = "purchase_invoice_details")
public class PurchaseInvoiceDetailsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long id_purchase;

    private Long id_product;

    private String code;

    private int amount;

    private float price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId_purchase() {
        return id_purchase;
    }

    public void setId_purchase(Long id_purchase) {
        this.id_purchase = id_purchase;
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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
