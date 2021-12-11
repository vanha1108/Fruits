package com.spring.socialising.services.ProductService;

import com.spring.socialising.entities.ProductEntity;

import java.util.List;

public interface ProductService {
    List<ProductEntity> findAll();
    ProductEntity findProductById(Long id);
    ProductEntity findProductByCode(String code);
    ProductEntity addProduct(ProductEntity productEntity);
    ProductEntity updateProduct(ProductEntity productEntity);

    List<ProductEntity> findProductByCategory(Long id);
}
