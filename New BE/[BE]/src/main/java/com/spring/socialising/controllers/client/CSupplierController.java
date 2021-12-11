package com.spring.socialising.controllers.client;

import com.spring.socialising.entities.SupplierEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.SupplierService.SupplierService;
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
@RequestMapping("/rest/supplier")
public class CSupplierController {
    @Autowired
    private SupplierService supplierService;

    @ApiOperation("Get all supplier from system")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> getAllSupplier() {
        return new ResponseEntity<>(
                new ResponseData(true, "List supplier",
                        supplierService.findAll()), OK);
    }

    @ApiOperation("Get supplier by id")
    @GetMapping("/by-id/{id}")
    public ResponseEntity<ResponseData> getSupplierById(@PathVariable Long id) {
        SupplierEntity supplier = supplierService.findSupplierById(id);
        if (supplier == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Id incorrect",
                            null), BAD_REQUEST);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "found",
                        supplier), OK);
    }
}
