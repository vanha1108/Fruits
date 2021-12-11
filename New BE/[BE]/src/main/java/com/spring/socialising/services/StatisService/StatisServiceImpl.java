package com.spring.socialising.services.StatisService;

import com.spring.socialising.entities.response.StatisData;
import com.spring.socialising.repositories.CustomerRepository.CustomerRepository;
import com.spring.socialising.repositories.ProductRepository.ProductRepository;
import com.spring.socialising.repositories.SellInvoiceRepository.SellInvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional
public class StatisServiceImpl implements StatisService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SellInvoiceRepository sellInvoiceRepository;

    @Override
    public StatisData getSummaryStatistical() {
        StatisData statisData = new StatisData();

        statisData.setCountCustomer(customerRepository.count());
        statisData.setCountProduct(productRepository.count());
        statisData.setCountOrderInvoice(sellInvoiceRepository.count());
        BigDecimal totalInvoiceValue = sellInvoiceRepository.getTotalInvoiceValue();
        if(totalInvoiceValue==null)
        {
            totalInvoiceValue = new BigDecimal(0);
        }
        statisData.setTotalPriceOrderValue(totalInvoiceValue);

        return statisData;
    }
}
