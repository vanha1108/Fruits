package com.spring.socialising.repositories.PurchaseInvoiceDetailRepository;

import com.spring.socialising.entities.PurchaseInvoiceDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PurchaseInvoiceDetailRepository extends JpaRepository<PurchaseInvoiceDetailsEntity, Long> {

    @Query(value = "SELECT PC FROM PurchaseInvoiceDetailsEntity PC where PC.id_purchase = :id")
    List<PurchaseInvoiceDetailsEntity> findAllDetailByIdPurchase(@Param("id") Long id);
}
