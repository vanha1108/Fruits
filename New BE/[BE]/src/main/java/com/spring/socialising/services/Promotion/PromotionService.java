package com.spring.socialising.services.Promotion;

import com.spring.socialising.entities.ProductEntity;
import com.spring.socialising.entities.PromotionEntity;

import java.util.List;

public interface PromotionService {
    List<PromotionEntity> findAll();
    PromotionEntity findById(Long id);
    PromotionEntity findByCode(String code);
    PromotionEntity addPromotion(PromotionEntity promotionEntity);
    PromotionEntity updatePromotion(PromotionEntity promotionEntity);
}
