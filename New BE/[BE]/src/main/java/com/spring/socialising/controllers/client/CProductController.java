package com.spring.socialising.controllers.client;


import com.spring.socialising.entities.CategoryEntity;
import com.spring.socialising.entities.ProductEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.CategoryService.CategoryService;
import com.spring.socialising.services.ProductService.ProductService;
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
@RequestMapping("/rest/product")
public class CProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @ApiOperation("Get List product by customer")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> findAllProduct() {
        return new ResponseEntity<>(
                new ResponseData(true, "List product",
                        productService.findAll()), OK);
    }

    @ApiOperation("Get list product by category")
    @GetMapping("/list-by-category/{id}")
    public ResponseEntity<ResponseData> findProductByCategory(@PathVariable Long id) {
        CategoryEntity categoryEntity = categoryService.findCategoryById(id);
        if (categoryEntity == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "Incorrect id category",
                            id), BAD_REQUEST);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "List product by category",
                        productService.findProductByCategory(id)), OK);
    }

    @ApiOperation("Get product by id")
    @GetMapping("/detail/{id}")
    public ResponseEntity<ResponseData> findProductById(@PathVariable Long id) {
        ProductEntity productEntity = productService.findProductById(id);

        if (productEntity == null) {
            return new ResponseEntity<>(
                    new ResponseData(false, "product does not exist",
                            id), BAD_REQUEST);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "product detail found",
                        productEntity), OK);
    }
}
