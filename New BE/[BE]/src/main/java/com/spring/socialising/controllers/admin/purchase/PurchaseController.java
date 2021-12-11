package com.spring.socialising.controllers.admin.purchase;

import com.spring.socialising.entities.PurchaseInvoiceEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.PurchaseInvoice.PurchaseInvoiceService;
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
@RequestMapping("rest/admin/purchase")
public class PurchaseController {

    @Autowired
    private PurchaseInvoiceService purchaseInvoiceService;

    @ApiOperation("get all purchase from system")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> findAll(){
        return new ResponseEntity<>(
                new ResponseData(true, "List purchase", purchaseInvoiceService.findAllPurchase()), OK);
    }

    @ApiOperation("Get details purchase")
    @GetMapping("/detail/{id}")
    public ResponseEntity<ResponseData> findPurchaseDetail(@PathVariable Long id){
        PurchaseInvoiceEntity purchaseInvoiceEntity = purchaseInvoiceService.findPurchaseById(id);

        if(purchaseInvoiceEntity == null){
            return new ResponseEntity<>(
                    new ResponseData(false, "id incorrect", null), BAD_REQUEST);
        }

        return new ResponseEntity<>(
                new ResponseData(true, "List purchase detail", purchaseInvoiceService.findAllPurchaseDetailById(id)), OK);
    }

}
