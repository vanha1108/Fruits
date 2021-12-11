package com.spring.socialising.repositories.SellInvoiceRepository;

import com.spring.socialising.entities.SellInvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface SellInvoiceRepository extends JpaRepository<SellInvoiceEntity, Long> {
    @Query("SELECT SUM(total_price) FROM SellInvoiceEntity")
    BigDecimal getTotalInvoiceValue();

    @Query("UPDATE SellInvoiceEntity SET status = 1 where id=:id")
    SellInvoiceEntity changeStatusToFinished(Long id);

    @Query("SELECT SI FROM SellInvoiceEntity SI WHERE SI.id_customer=:id")
    List<SellInvoiceEntity> findByCustomer(@Param("id") Long id);

    @Query("SELECT SI FROM SellInvoiceEntity SI WHERE SI.code=:code")
    SellInvoiceEntity findByCode(@Param("code") String code);
}
