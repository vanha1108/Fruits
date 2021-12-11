package com.spring.socialising.services.CategoryService;

import com.spring.socialising.entities.CategoryEntity;
import com.spring.socialising.repositories.CategoryRepository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryEntity> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryEntity findCategoryById(Long id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if(category.isPresent()){
            return category.get();
        }
        return null;
    }

    @Override
    @Transactional
    public CategoryEntity addCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    @Override
    public CategoryEntity updateCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }
}
