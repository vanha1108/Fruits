package com.spring.socialising.controllers.admin.order;

import com.spring.socialising.entities.SellInvoiceEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.OrderService.OrderService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/rest/admin/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @ApiOperation("get all order")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> findAll(){
        return new ResponseEntity<>(
                new ResponseData(true, "List order", orderService.findAll()), OK);
    }

    @ApiOperation("Get detail Invoice By Id")
    @GetMapping("/details/{id}")
    public ResponseEntity<ResponseData> findDetailById(@PathVariable Long id){
        SellInvoiceEntity sellInvoiceEntity = orderService.findById(id);
        if(sellInvoiceEntity == null){
            return new ResponseEntity<>(
                    new ResponseData(false, "Id incorrect", null), BAD_REQUEST);
        }

        return new ResponseEntity<>(
                new ResponseData(true, "List detail by id :"+id, orderService.findAllDetailById(id)), OK);
    }

    @ApiOperation("Change status finished")
    @GetMapping("/status-finish/{id}")
    public ResponseEntity<ResponseData> fnishOrder(@PathVariable Long id){
        SellInvoiceEntity sellInvoiceEntity = orderService.findById(id);
        if(sellInvoiceEntity == null){
            return new ResponseEntity<>(
                    new ResponseData(false, "Id incorrect", null), BAD_REQUEST);
        }
        if(sellInvoiceEntity.getStatus()==1){
            return new ResponseEntity<>(
                    new ResponseData(false, "Order have already finished", null), BAD_REQUEST);
        }
        sellInvoiceEntity.setStatus(1);

        return new ResponseEntity<>(
                new ResponseData(true, "Finished", orderService.updateSellInvoice(sellInvoiceEntity)), OK);
    }
}
