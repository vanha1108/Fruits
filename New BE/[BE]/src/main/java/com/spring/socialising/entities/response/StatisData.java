package com.spring.socialising.entities.response;

import java.math.BigDecimal;

public class StatisData {
    private Long countCustomer;

    private Long countProduct;

    private Long countOrderInvoice;

    private BigDecimal totalPriceOrderValue;

    public Long getCountCustomer() {
        return countCustomer;
    }

    public void setCountCustomer(Long countCustomer) {
        this.countCustomer = countCustomer;
    }

    public Long getCountProduct() {
        return countProduct;
    }

    public void setCountProduct(Long countProduct) {
        this.countProduct = countProduct;
    }

    public Long getCountOrderInvoice() {
        return countOrderInvoice;
    }

    public void setCountOrderInvoice(Long countOrderInvoice) {
        this.countOrderInvoice = countOrderInvoice;
    }

    public BigDecimal getTotalPriceOrderValue() {
        return totalPriceOrderValue;
    }

    public void setTotalPriceOrderValue(BigDecimal totalPriceOrderValue) {
        this.totalPriceOrderValue = totalPriceOrderValue;
    }
}
