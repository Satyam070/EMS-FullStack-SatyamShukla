package com.example.employeemanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** This class represents the configuration for CORS. */
@Configuration
public class CorsConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {

    // Add CORS mappings
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedOriginPatterns("*") // Allows all origins with patterns
            .allowedMethods("GET", "POST", "PUT", "DELETE") // List all allowed HTTP methods
            .allowedHeaders("*") // Allows all headers
            .allowCredentials(true); // Allow credentials (cookies, etc.)
      }
    };
  }
}
