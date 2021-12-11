package com.spring.socialising.controllers.client;

import com.spring.socialising.dtos.OrderDTO;
import com.spring.socialising.entities.*;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.securities.JwtUserDetails;
import com.spring.socialising.services.CustomerService.CustomerService;
import com.spring.socialising.services.OrderService.OrderService;
import com.spring.socialising.services.ProductService.ProductService;
import com.spring.socialising.services.Promotion.PromotionService;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/rest/user")
public class COrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private CustomerService customerService;

    @ApiOperation("Order")
    @PostMapping("/order")
    @Transactional
    public ResponseEntity<ResponseData> uploadOrder(@RequestBody OrderDTO orderDTO) {
        if (StringUtils.isEmpty(orderDTO.getReceive_name())
                || StringUtils.isEmpty(orderDTO.getReceive_address())
                || StringUtils.isEmpty(orderDTO.getReceive_phone_number())) {

            return new ResponseEntity<>(
                    new ResponseData(false, "Information of customer is required", orderDTO), BAD_REQUEST);
        }
        PromotionEntity promotionEntity = null;
        if (!StringUtils.isEmpty(orderDTO.getPromotion_code())) {
            promotionEntity = promotionService.findByCode(orderDTO.getPromotion_code());
            if (promotionEntity == null) {
                return new ResponseEntity<>(
                        new ResponseData(false, "Invalid promotion code: " + orderDTO.getPromotion_code(),
                                orderDTO), BAD_REQUEST);
            }
        }

        List<ProductEntity> listProductFound = new ArrayList<>();
        float totalPrice = 0;
        for (ProductEntity product : orderDTO.getProduct_list()) {
            ProductEntity productFound = productService.findProductById(product.getId());

            if (productFound == null) {
                return new ResponseEntity<>(
                        new ResponseData(false, "Invalid product with id: " + product.getId(),
                                orderDTO), BAD_REQUEST);
            } else {
                if (productFound.getAmount() - product.getAmount() < 0) {
                    return new ResponseEntity<>(
                            new ResponseData(false, "Invalid product with id: " + product.getId(),
                                    orderDTO), BAD_REQUEST);
                }
            }

            totalPrice += productFound.getPrice();
            productFound.setAmount(productFound.getAmount() - product.getAmount());
            listProductFound.add(productFound);
        }

        SellInvoiceEntity sellInvoiceEntity = new SellInvoiceEntity();
        JwtUserDetails userDetails = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomerEntity customerEntity = customerService.findById(Long.parseLong(userDetails.getId()));
        String code = null;
        while (code == null) {
            code = UUID.randomUUID().toString().toUpperCase().replace("-", "").substring(0, 9);
            if (orderService.findByCode(code) != null) {
                code = null;
            }
        }

        sellInvoiceEntity.setId_account(customerEntity.getId_account());
        sellInvoiceEntity.setId_customer(Long.parseLong(userDetails.getId()));
        sellInvoiceEntity.setCode(code);
        sellInvoiceEntity.setCreated_time(LocalDateTime.now());
        sellInvoiceEntity.setStatus(0);
        sellInvoiceEntity.setTotal_price(totalPrice);

        if (promotionEntity != null) {
            sellInvoiceEntity.setPromotion_code((promotionEntity == null) ? "" : promotionEntity.getCode());
            sellInvoiceEntity.setPromotion_price(totalPrice - (totalPrice * (100 - promotionEntity.getPrice().floatValue()) / 100));

        } else {
            sellInvoiceEntity.setPromotion_code("");
            sellInvoiceEntity.setPromotion_price(0);
        }

        sellInvoiceEntity.setFinal_price(sellInvoiceEntity.getTotal_price() - sellInvoiceEntity.getPromotion_price());
        sellInvoiceEntity.setReceive_name(orderDTO.getReceive_name());
        sellInvoiceEntity.setReceive_phone_number(orderDTO.getReceive_phone_number());
        sellInvoiceEntity.setReceive_address(orderDTO.getReceive_address());

        sellInvoiceEntity = orderService.saveInvoice(sellInvoiceEntity);

        for (ProductEntity product : orderDTO.getProduct_list()) {
            ProductEntity productUpdate = productService.findProductById(product.getId());
            SellInvoiceDetailsEntity sellInvoiceDetailsEntity = new SellInvoiceDetailsEntity();
            sellInvoiceDetailsEntity.setId_sell(sellInvoiceEntity.getId());
            sellInvoiceDetailsEntity.setId_product(productUpdate.getId());
            sellInvoiceDetailsEntity.setCode(productUpdate.getCode());
            sellInvoiceDetailsEntity.setAmount(product.getAmount());
            sellInvoiceDetailsEntity.setPrice(productUpdate.getPrice());
            orderService.SaveInvoiceDetail(sellInvoiceDetailsEntity);

            productUpdate.setAmount(productUpdate.getAmount() - product.getAmount());
            productService.updateProduct(productUpdate);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "invoice have been created",
                        sellInvoiceEntity), OK);
    }


    @ApiOperation("get all order by user")
    @GetMapping("/order-list")
    public ResponseEntity<ResponseData> findAllOrderByCustomer() {
        JwtUserDetails userDetails = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(
                new ResponseData(true, "list order by customer",
                        orderService.findByCustomer(Long.parseLong(userDetails.getId()))), OK);
    }

    @ApiOperation("Get detail Invoice By Id")
    @GetMapping("/order-details/{id}")
    public ResponseEntity<ResponseData> findDetailById(@PathVariable Long id) {
        SellInvoiceEntity sellInvoiceEntity = orderService.findById(id);
        if (sellInvoiceEntity == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Id incorrect",
                            null), BAD_REQUEST);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "List detail by id :" + id,
                        orderService.findAllDetailById(id)), OK);
    }

}
