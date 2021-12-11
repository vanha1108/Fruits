package com.spring.socialising.controllers.admin.supplier;

import com.spring.socialising.entities.SupplierEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.SupplierService.SupplierService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/rest/admin/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @ApiOperation("Get all supplier from system")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> getAllSupplier() {
        return new ResponseEntity<>(
                new ResponseData(true, "List supplier", supplierService.findAll()), OK);
    }

    @ApiOperation("Get supplier by id")
    @GetMapping("/by-id/{id}")
    public ResponseEntity<ResponseData> getSupplierById(@PathVariable Long id) {
        SupplierEntity supplier = supplierService.findSupplierById(id);
        if (supplier == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Id incorrect", null), BAD_REQUEST);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "found", supplier), OK);
    }

    @ApiOperation("Add supplier")
    @PostMapping("/add")
    public ResponseEntity<ResponseData> addSupplier(@RequestBody SupplierEntity supplierEntity) {
        supplierService.addSupplier(supplierEntity);
        return new ResponseEntity<>(
                new ResponseData(true, "created", supplierEntity), CREATED);
    }

    @ApiOperation("Update supplier")
    @PutMapping("/update")
    public ResponseEntity<ResponseData> updateSupplier(@RequestBody SupplierEntity supplierEntity) {
        supplierService.updateSupplier(supplierEntity);
        return new ResponseEntity<>(
                new ResponseData(true, "updated", supplierEntity), OK);
    }

}
