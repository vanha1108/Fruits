package com.spring.socialising.services.SupplierService;

import com.spring.socialising.entities.SupplierEntity;
import com.spring.socialising.repositories.SupplierRepository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public List<SupplierEntity> findAll() {
        return supplierRepository.findAll();
    }

    @Override
    public SupplierEntity findSupplierById(Long id) {
        Optional<SupplierEntity> supplier = supplierRepository.findById(id);
        if(supplier.isPresent()){
            return supplier.get();
        }
        return null;
    }

    @Override
    public SupplierEntity addSupplier(SupplierEntity supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public SupplierEntity updateSupplier(SupplierEntity supplier) {
        return supplierRepository.save(supplier);
    }
}
