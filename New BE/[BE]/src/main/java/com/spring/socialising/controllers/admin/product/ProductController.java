package com.spring.socialising.controllers.admin.product;

import com.spring.socialising.entities.ProductEntity;
import com.spring.socialising.entities.PurchaseInvoiceDetailsEntity;
import com.spring.socialising.entities.PurchaseInvoiceEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.securities.JwtUserDetails;
import com.spring.socialising.services.CategoryService.CategoryService;
import com.spring.socialising.services.ProductService.ProductService;
import com.spring.socialising.services.PurchaseInvoice.PurchaseInvoiceService;
import com.spring.socialising.services.SupplierService.SupplierService;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/rest/admin/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PurchaseInvoiceService purchaseInvoiceService;

    @ApiOperation("Get all product by system")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> getAllProduct() {
        return new ResponseEntity<>(
                new ResponseData(true, "List product", productService.findAll()), OK);
    }

    @ApiOperation("Get product by id")
    @GetMapping("/by-id/{id}")
    public ResponseEntity<ResponseData> getProductById(@PathVariable Long id) {
        ProductEntity productEntity = productService.findProductById(id);
        if (productEntity == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Id incorrect", null), BAD_REQUEST);
        } else {
            return new ResponseEntity<>(
                    new ResponseData(true, "Get product by id", productEntity), OK);
        }
    }

    @ApiOperation("Add product into system")
    @PostMapping("/add")
    public ResponseEntity<ResponseData> addProduct(@RequestBody ProductEntity productEntity) {
        productEntity.setPrice(0);
        productEntity.setAmount(0);
        productEntity.setPurchase_price(0);

        ProductEntity productCode = null;
        String code = null;
        do {
            code = UUID.randomUUID().toString().toLowerCase().replace("-", "").substring(0, 6);
            productCode = productService.findProductByCode(code);
        } while (productCode != null);

        productEntity.setCode(code);
        productEntity = productService.addProduct(productEntity);

        if (StringUtils.isEmpty(productEntity.getId().toString())) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Data in not format", null), BAD_REQUEST);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "Created", productEntity), CREATED);
    }

    @ApiOperation("Purchase product")
    @PostMapping("/purchase-cargo")
    @Transactional
    public ResponseEntity<ResponseData> addPurchase(@RequestBody List<ProductEntity> productList) {
        for (ProductEntity product : productList) {
            ProductEntity productFound = productService.findProductById(product.getId());
            productFound.setAmount(productFound.getAmount() + product.getAmount());
            productFound.setPurchase_price(product.getPurchase_price());
            productFound.setPrice(product.getPrice());
            product.setCode(productFound.getCode());
            productService.updateProduct(productFound);
        }

        JwtUserDetails userDetails = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PurchaseInvoiceEntity purchaseInvoiceEntity = new PurchaseInvoiceEntity();
        purchaseInvoiceEntity.setId_account(Long.parseLong(userDetails.getId()));
        purchaseInvoiceEntity.setCode(UUID.randomUUID().toString().toUpperCase().replace("-", "").substring(0, 8).toUpperCase());
        purchaseInvoiceEntity.setTotal_price(new BigDecimal(0));
        purchaseInvoiceEntity.setCreated_time(LocalDateTime.now());
        purchaseInvoiceService.addPurchaseWithSupplier(purchaseInvoiceEntity);

        float total = 0;
        for (ProductEntity product : productList) {
            PurchaseInvoiceDetailsEntity purchaseInvoiceDetailsEntity = new PurchaseInvoiceDetailsEntity();
            purchaseInvoiceDetailsEntity.setId_purchase(purchaseInvoiceEntity.getId());
            purchaseInvoiceDetailsEntity.setId_product(product.getId());
            purchaseInvoiceDetailsEntity.setCode(product.getCode().toUpperCase());
            purchaseInvoiceDetailsEntity.setAmount(product.getAmount());
            purchaseInvoiceDetailsEntity.setPrice(product.getPurchase_price());
            purchaseInvoiceService.addPurchaseDetail(purchaseInvoiceDetailsEntity);
            total += product.getAmount() * product.getPurchase_price();
        }

        purchaseInvoiceEntity.setTotal_price(new BigDecimal(total));
        purchaseInvoiceService.updatePurchase(purchaseInvoiceEntity);

        return new ResponseEntity<>(
                new ResponseData(true, "Purchase succesflly", purchaseInvoiceEntity.getId()), OK);
    }

    @ApiOperation("Update product")
    @PutMapping("/update")
    public ResponseEntity<ResponseData> updateProduct(@RequestBody ProductEntity product) {
        if (product.getId() == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "product id is required", null), OK);
        }

        ProductEntity productEntity = productService.findProductById(product.getId());
        productEntity.setPrice(product.getPrice());
        productEntity.setName(product.getName());
        productEntity.setId_category(product.getId_category());
        productEntity.setImage(product.getImage());
        productEntity.setShort_description(product.getShort_description());
        productEntity.setLong_description(product.getLong_description());
        productService.updateProduct(productEntity);

        return new ResponseEntity<>(
                new ResponseData(true, "updated", productEntity), OK);
    }
}
