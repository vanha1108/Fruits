package com.spring.socialising.services.PurchaseInvoice;

import com.spring.socialising.entities.PurchaseInvoiceDetailsEntity;
import com.spring.socialising.entities.PurchaseInvoiceEntity;
import com.spring.socialising.repositories.PurchaseInvoice.PurchaseInvoiceRepository;
import com.spring.socialising.repositories.PurchaseInvoiceDetailRepository.PurchaseInvoiceDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseInvoiceServiceImpl implements PurchaseInvoiceService {

    @Autowired
    private PurchaseInvoiceRepository purchaseInvoiceRepository;

    @Autowired
    private PurchaseInvoiceDetailRepository purchaseInvoiceDetailRepository;

    @Override
    public List<PurchaseInvoiceEntity> findAllPurchase() {
        return purchaseInvoiceRepository.findAll();
    }

    @Override
    public PurchaseInvoiceEntity findPurchaseById(Long id) {
        Optional<PurchaseInvoiceEntity> purchaseInvoiceEntity = purchaseInvoiceRepository.findById(id);
        if(purchaseInvoiceEntity.isPresent()){
            return purchaseInvoiceEntity.get();
        }
        return null;
    }

    @Override
    public PurchaseInvoiceEntity addPurchaseWithSupplier(PurchaseInvoiceEntity purchaseInvoiceEntity) {
        return purchaseInvoiceRepository.save(purchaseInvoiceEntity);
    }

    @Override
    public PurchaseInvoiceEntity updatePurchase(PurchaseInvoiceEntity purchaseInvoiceEntity) {
        return purchaseInvoiceRepository.save(purchaseInvoiceEntity);
    }

    @Override
    public List<PurchaseInvoiceDetailsEntity> findAllPurchaseDetailById(Long id) {
        return purchaseInvoiceDetailRepository.findAllDetailByIdPurchase(id);
    }

    @Override
    public PurchaseInvoiceDetailsEntity addPurchaseDetail(PurchaseInvoiceDetailsEntity purchaseInvoiceDetailsEntity) {
        return purchaseInvoiceDetailRepository.save(purchaseInvoiceDetailsEntity);
    }
}
