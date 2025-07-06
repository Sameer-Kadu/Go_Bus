package com.go_bus.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomJWTAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    // List of public endpoints to skip JWT filtering
    private static final List<String> PUBLIC_PATHS = List.of(
        "/User/signup",
        "/User/signin",
        "/bus/search",
        "/swagger-ui",
        "/swagger-ui/",
        "/v3/api-docs"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        System.out.println("Inside filter class. Request path: " + path);

        // Skip JWT processing for public paths
        for (String publicPath : PUBLIC_PATHS) {
            if (path.equals(publicPath) || path.startsWith(publicPath + "/")) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        // Check for Authorization header
        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header: " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            Authentication authentication = jwtUtils.populateAuthenticationTokenFromJWT(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("Saved auth details under Spring Security context");
        }

        filterChain.doFilter(request, response);
    }
}
