package com.go_bus.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.datasource")
public class DatabaseProperties {
    private String url;
    private String username;
    private String password;

    public void printProperties() {
        System.out.println("DB_URL: " + url);
        System.out.println("DB_USERNAME: " + username);
        System.out.println("DB_PASSWORD: " + password);
    }
}

