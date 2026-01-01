package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 100)
    private String description;

    @Column()
    private boolean completed = Boolean.FALSE;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
