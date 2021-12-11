package com.spring.socialising.services.OrderService;

import com.spring.socialising.entities.SellInvoiceDetailsEntity;
import com.spring.socialising.entities.SellInvoiceEntity;
import com.spring.socialising.repositories.SellInvoiceDetailRepository.SellInvoiceDetailRepository;
import com.spring.socialising.repositories.SellInvoiceRepository.SellInvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private SellInvoiceRepository sellInvoiceRepository;

    @Autowired
    private SellInvoiceDetailRepository sellInvoiceDetailRepository;

    @Override
    public List<SellInvoiceEntity> findAll() {
        return sellInvoiceRepository.findAll();
    }

    @Override
    public SellInvoiceEntity findById(Long id) {
        Optional<SellInvoiceEntity> sellInvoiceFound = sellInvoiceRepository.findById(id);
        if(sellInvoiceFound.isPresent()){
            return sellInvoiceFound.get();
        }
        return null;
    }

    @Override
    public List<SellInvoiceDetailsEntity> findAllDetailById(Long id) {
        return sellInvoiceDetailRepository.findListByIdSell(id);
    }

    @Override
    public SellInvoiceEntity changeStatusToFinished(Long id) {
        return sellInvoiceRepository.changeStatusToFinished(id);
    }

    @Override
    public SellInvoiceEntity updateSellInvoice(SellInvoiceEntity sellInvoiceEntity) {
        return sellInvoiceRepository.save(sellInvoiceEntity);
    }

    @Override
    public List<SellInvoiceEntity> findByCustomer(Long id) {
        return sellInvoiceRepository.findByCustomer(id);
    }

    @Override
    public SellInvoiceEntity findByCode(String code) {
        return sellInvoiceRepository.findByCode(code);
    }

    @Override
    public SellInvoiceEntity saveInvoice(SellInvoiceEntity sellInvoiceEntity) {
        return sellInvoiceRepository.save(sellInvoiceEntity);
    }

    @Override
    public SellInvoiceDetailsEntity SaveInvoiceDetail(SellInvoiceDetailsEntity sellInvoiceDetailsEntity) {
        return sellInvoiceDetailRepository.save(sellInvoiceDetailsEntity);
    }
}
