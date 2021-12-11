package com.spring.socialising.services.PurchaseInvoice;

import com.spring.socialising.entities.PurchaseInvoiceDetailsEntity;
import com.spring.socialising.entities.PurchaseInvoiceEntity;

import java.util.List;

public interface PurchaseInvoiceService {
    List<PurchaseInvoiceEntity> findAllPurchase();
    PurchaseInvoiceEntity findPurchaseById(Long id);
    PurchaseInvoiceEntity addPurchaseWithSupplier(PurchaseInvoiceEntity purchaseInvoiceEntity);
    PurchaseInvoiceEntity updatePurchase(PurchaseInvoiceEntity purchaseInvoiceEntity);

    List<PurchaseInvoiceDetailsEntity> findAllPurchaseDetailById(Long id);
    PurchaseInvoiceDetailsEntity addPurchaseDetail(PurchaseInvoiceDetailsEntity purchaseInvoiceDetailsEntity);
}
