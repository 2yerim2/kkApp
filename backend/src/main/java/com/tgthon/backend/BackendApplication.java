package com.tgthon.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        System.out.println("BackendApplication 시작");
        SpringApplication.run(BackendApplication.class, args);
    }
}

