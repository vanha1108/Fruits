package com.spring.socialising.controllers.client;

import com.spring.socialising.entities.CategoryEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.CategoryService.CategoryService;
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
@RequestMapping("/rest/category")
public class CCategoryController {
    @Autowired
    private CategoryService categoryService;

    @ApiOperation("Get all catagory from system")
    @GetMapping("/list")
    public ResponseEntity<ResponseData> getAllCategory() {
        return new ResponseEntity<>(
                new ResponseData(true, "List category", categoryService.findAll()), OK);
    }

    @ApiOperation("Get category by id")
    @GetMapping("/by-id/{id}")
    public ResponseEntity<ResponseData> getCategoryById(@PathVariable Long id) {
        CategoryEntity categoryEntity = categoryService.findCategoryById(id);
        if (categoryEntity == null) {
            return new ResponseEntity<>(new ResponseData(false, "Id incorrect", null), BAD_REQUEST);
        }
        return new ResponseEntity<>(
                new ResponseData(true, "found", categoryEntity), OK);
    }
}
