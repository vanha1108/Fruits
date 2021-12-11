package com.spring.socialising.services.ProductService;

import com.spring.socialising.entities.ProductEntity;
import com.spring.socialising.repositories.ProductRepository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductEntity> findAll() {
        return productRepository.findAll();
    }

    @Override
    public ProductEntity findProductById(Long id) {
        Optional<ProductEntity> productEntity = productRepository.findById(id);
        if(productEntity.isPresent()){
            return productEntity.get();
        }
        return null;
    }

    @Override
    public ProductEntity findProductByCode(String code) {
        return productRepository.findProductEntitiesByCode(code);
    }

    @Override
    public ProductEntity addProduct(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Override
    public ProductEntity updateProduct(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Override
    public List<ProductEntity> findProductByCategory(Long id) {
        return productRepository.findProductByCategory(id);
    }
}
