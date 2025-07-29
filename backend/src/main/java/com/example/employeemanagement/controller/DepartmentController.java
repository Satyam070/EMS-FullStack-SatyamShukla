package com.example.employeemanagement.controller;

import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.Department;
import com.example.employeemanagement.service.DepartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/** This class represents the REST API controller for departments. */
@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

  /** The department service. */
  @Autowired private DepartmentService departmentService;

  @GetMapping
  public List<Department> getAllDepartments() {
    return departmentService.getAllDepartments();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Department> getDepartmentById(
 @PathVariable Long id) {
    Department department =
        departmentService
            .getDepartmentById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException("Department not found with id: " + id));
    return ResponseEntity.ok(department);
  }


  @PostMapping
  public Department createDepartment(@RequestBody Department department) {
    return departmentService.saveDepartment(department);
  }


  @PutMapping("/{id}")
  public ResponseEntity<Department> updateDepartment(
      @PathVariable Long id,
      @RequestBody Department departmentDetails) {
    Department department =
        departmentService
            .getDepartmentById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException("Department not found with id: " + id));

    department.setName(departmentDetails.getName());

    Department updatedDepartment = departmentService.saveDepartment(department);
    return ResponseEntity.ok(updatedDepartment);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteDepartment(
      @PathVariable Long id) {
    Department department =
        departmentService
            .getDepartmentById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException("Department not found with id: " + id));

    departmentService.deleteDepartment(id);
    return ResponseEntity.noContent().build();
  }
}
