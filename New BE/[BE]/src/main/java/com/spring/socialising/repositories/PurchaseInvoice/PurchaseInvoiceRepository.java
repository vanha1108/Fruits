package com.spring.socialising.repositories.PurchaseInvoice;

import com.spring.socialising.entities.PurchaseInvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseInvoiceRepository extends JpaRepository<PurchaseInvoiceEntity, Long> {
}
