package com.spring.socialising.services.CategoryService;

import com.spring.socialising.entities.CategoryEntity;

import java.util.List;

public interface CategoryService {
    List<CategoryEntity> findAll();
    CategoryEntity findCategoryById(Long id);
    CategoryEntity addCategory(CategoryEntity category);
    CategoryEntity updateCategory(CategoryEntity category);
}
