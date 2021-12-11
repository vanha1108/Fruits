package com.spring.socialising.services.SupplierService;

import com.spring.socialising.entities.SupplierEntity;

import java.util.List;

public interface SupplierService {
   List<SupplierEntity> findAll();
   SupplierEntity findSupplierById(Long id);
   SupplierEntity addSupplier(SupplierEntity supplier);
   SupplierEntity updateSupplier(SupplierEntity supplier);
}
