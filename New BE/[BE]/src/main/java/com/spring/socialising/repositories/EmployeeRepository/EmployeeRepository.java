package com.spring.socialising.repositories.EmployeeRepository;

import com.spring.socialising.entities.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {

   @Query("SELECT EE FROM EmployeeEntity EE WHERE EE.id_account = :id")
   EmployeeEntity findEmployeeEntitiesByIdAccount(@Param("id") Long id);
}
