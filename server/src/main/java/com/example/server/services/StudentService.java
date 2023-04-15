package com.example.server.services;

import com.example.server.models.Student;
import com.example.server.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAll(){
        return (List<Student>) studentRepository.findAll();
    }

    public Student saveStudent(Student student){
        return studentRepository.save(student);
    }
}
