package org.example.backend.Repository;

import org.example.backend.Entity.Task;
import org.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findByTitle(String title);
    Optional<Task> findById(long id);
    Optional<Task> findByIdAndUser(long id, User user);
    List<Task> findByUser(User user);
    List<Task> findByUserId(long id);
    List<Task> findByUserAndCompleted(User user, boolean completed);
    List<Task> findByCompleted(boolean completed);
}
