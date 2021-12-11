package com.spring.socialising.services.Promotion;

import com.spring.socialising.entities.PromotionEntity;
import com.spring.socialising.repositories.Promotion.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public List<PromotionEntity> findAll() {
        return promotionRepository.findAll();
    }

    @Override
    public PromotionEntity findById(Long id) {
        Optional<PromotionEntity> promotionFound = promotionRepository.findById(id);
         if(promotionFound.isPresent()){
             return promotionFound.get();
         }
         return null;
    }

    @Override
    public PromotionEntity findByCode(String code) {
        return promotionRepository.findPromotionEntityByCode(code);
    }

    @Override
    public PromotionEntity addPromotion(PromotionEntity promotionEntity) {
        promotionEntity.setCode(null);
        while (promotionEntity.getCode()==null){
            promotionEntity.setCode(UUID.randomUUID().toString().toUpperCase().replace("-","").substring(0,5));
            if(this.findByCode(promotionEntity.getCode()) != null){
                promotionEntity.setCode(null);
            }
        }
        return  promotionRepository.save(promotionEntity);
    }

    @Override
    public PromotionEntity updatePromotion(PromotionEntity promotionEntity) {
        return promotionRepository.save(promotionEntity);
    }
}
