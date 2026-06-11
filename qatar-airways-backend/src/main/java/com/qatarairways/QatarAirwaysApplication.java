package com.qatarairways;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QatarAirwaysApplication {

    public static void main(String[] args) {
        SpringApplication.run(QatarAirwaysApplication.class, args);
        System.out.println("╔══════════════════════════════════════════╗");
        System.out.println("║   Qatar Airways Backend is RUNNING!     ║");
        System.out.println("║   Port: 5000                            ║");
        System.out.println("╚══════════════════════════════════════════╝");
    }
}