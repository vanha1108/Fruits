package com.spring.socialising.controllers.admin.promotion;

import com.spring.socialising.dtos.PromotionDTO;
import com.spring.socialising.entities.PromotionEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.Promotion.PromotionService;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/rest/admin/promotion")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @ApiOperation("Get promotion list")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> findAll() {
        return new ResponseEntity<>(
                new ResponseData(true, "Product list", promotionService.findAll()), OK);
    }

    @ApiOperation("Add new promotion")
    @PostMapping("/add")
    public ResponseEntity<ResponseData> addPromotion(@RequestBody PromotionDTO promotionDTO) {
        if (StringUtils.isEmpty(promotionDTO.getStart_date()) || StringUtils.isEmpty(promotionDTO.getEnd_date())) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Start date and end date is required", promotionDTO), BAD_REQUEST);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss a");
        LocalDateTime dateTimeStart = LocalDateTime.parse(promotionDTO.getStart_date() + " 00:00:00 AM", formatter);
        LocalDateTime dateTimeEnd = LocalDateTime.parse(promotionDTO.getEnd_date() + " 00:00:00 AM", formatter);

        PromotionEntity promotionEntity = new PromotionEntity();
        promotionEntity.setName(promotionDTO.getName());
        promotionEntity.setDescription(promotionDTO.getDescription());
        promotionEntity.setPrice(promotionDTO.getPrice());
        promotionEntity.setStart_date(dateTimeStart);
        promotionEntity.setEnd_date(dateTimeEnd);
        promotionService.addPromotion(promotionEntity);

        return new ResponseEntity<>(
                new ResponseData(true, "Created", promotionService.addPromotion(promotionEntity)), OK);
    }

    @ApiOperation("Update promotion")
    @PutMapping("/update")
    public ResponseEntity<ResponseData> updatePromotion(@RequestBody PromotionDTO promotionEntity) {
        if (promotionEntity.getStart_date() == null || promotionEntity.getEnd_date() == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Start date and end date is required", promotionEntity), BAD_REQUEST);
        }
        PromotionEntity promotionFound = promotionService.findById(promotionEntity.getId());
        if (promotionFound == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Incorrect id", promotionEntity), BAD_REQUEST);
        }

        promotionFound.setName(promotionEntity.getName());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss a");
        LocalDateTime dateTimeStart = LocalDateTime.parse(promotionEntity.getStart_date() + " 00:00:00 AM", formatter);
        LocalDateTime dateTimeEnd = LocalDateTime.parse(promotionEntity.getEnd_date() + " 00:00:00 AM", formatter);
        promotionFound.setStart_date(dateTimeStart);
        promotionFound.setEnd_date(dateTimeEnd);
        promotionFound.setPrice(promotionEntity.getPrice());

        promotionService.updatePromotion(promotionFound);

        return new ResponseEntity<>(
                new ResponseData(true, "Updated", promotionFound), OK);
    }
}
