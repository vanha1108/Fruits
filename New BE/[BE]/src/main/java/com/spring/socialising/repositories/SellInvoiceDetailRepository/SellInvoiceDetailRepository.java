package com.spring.socialising.repositories.SellInvoiceDetailRepository;

import com.spring.socialising.entities.SellInvoiceDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SellInvoiceDetailRepository extends JpaRepository<SellInvoiceDetailsEntity, Long> {

    @Query("SELECT SID FROM SellInvoiceDetailsEntity SID WHERE SID.id_sell =:id")
    List<SellInvoiceDetailsEntity> findListByIdSell(@Param("id") Long id);
}
