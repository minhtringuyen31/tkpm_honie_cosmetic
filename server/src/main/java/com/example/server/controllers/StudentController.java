package com.example.server.controllers;

import com.example.server.models.Student;
import com.example.server.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public List<Student> getAllStudent(){
        return studentService.getAll();
    }

    @PostMapping("/add")
    public String add(@RequestBody Student student){
        studentService.saveStudent((student));
        return "New student is added";
    }
}
