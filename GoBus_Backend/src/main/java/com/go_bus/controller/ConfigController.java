package com.go_bus.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
public class ConfigController {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Value("${spring.security.jwt.secret.key}")
    private String jwtSecret;

    @GetMapping("/env")
    public String getConfig() {
        return "DB_URL: " + dbUrl + "\nMAIL_USERNAME: " + mailUsername + "\nJWT_SECRET: " + jwtSecret;
    }
}
