package com.example.demo.controller;

import com.example.demo.model.User;
import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @GetMapping
    public ResponseEntity<?> getUser(){
        User user =  User.builder()
                .name("Gonzalo")
                .lastName("Vega")
                .birthday(LocalDate.now())
                .build();

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        System.out.println(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
