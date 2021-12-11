package com.spring.socialising.repositories.ProductRepository;

import com.spring.socialising.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    ProductEntity findProductEntitiesByCode(String code);

    @Query(value = "SELECT PE FROM ProductEntity PE WHERE PE.id_category=:id")
    List<ProductEntity> findProductByCategory(Long id);
}
