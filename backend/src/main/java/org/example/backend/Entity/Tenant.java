package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tenants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String subdomain;

    @Column(unique = true, nullable = false)
    private String database_name;

}
