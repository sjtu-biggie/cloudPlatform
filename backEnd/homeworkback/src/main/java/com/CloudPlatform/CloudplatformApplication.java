package com.CloudPlatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CloudplatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudplatformApplication.class, args);
    }

}
