package com.spring.socialising.services.OrderService;

import com.spring.socialising.entities.SellInvoiceDetailsEntity;
import com.spring.socialising.entities.SellInvoiceEntity;

import java.util.List;

public interface OrderService {
    List<SellInvoiceEntity> findAll();
    SellInvoiceEntity findById(Long id);
    List<SellInvoiceDetailsEntity> findAllDetailById(Long id);
    SellInvoiceEntity changeStatusToFinished(Long id);
    SellInvoiceEntity updateSellInvoice(SellInvoiceEntity sellInvoiceEntity);
    List<SellInvoiceEntity> findByCustomer(Long id);
    SellInvoiceEntity findByCode(String code);
    SellInvoiceEntity saveInvoice(SellInvoiceEntity sellInvoiceEntity);
    SellInvoiceDetailsEntity SaveInvoiceDetail(SellInvoiceDetailsEntity sellInvoiceDetailsEntity);
}
