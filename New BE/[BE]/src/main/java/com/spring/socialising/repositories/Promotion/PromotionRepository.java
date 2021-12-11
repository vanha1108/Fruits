package com.spring.socialising.repositories.Promotion;

import com.spring.socialising.entities.PromotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<PromotionEntity, Long> {

    PromotionEntity findPromotionEntityByCode(String code);
}
