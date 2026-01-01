package org.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.Dto.Request.TaskRequest;
import org.example.backend.Dto.Response.TaskResponse;
import org.example.backend.Entity.AuthUser;
import org.example.backend.Service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> findAll(@AuthenticationPrincipal AuthUser authUser) {
        var tasks = taskService.findAllByUser(authUser.getUsername());
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<TaskResponse> save(@RequestBody TaskRequest taskRequest, @AuthenticationPrincipal AuthUser authUser) {

        var username = authUser.getUsername();
        var newTask = taskService.save(taskRequest, username);

        URI location = MvcUriComponentsBuilder
                .fromMethodCall(
                        MvcUriComponentsBuilder.on(TaskController.class).findById(newTask.getId())
                )
                .build()
                .toUri();


        return ResponseEntity.created(location).body(newTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> findById(@PathVariable long id) {
        var task = taskService.findById(id);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        taskService.delete(id);
        return ResponseEntity.ok().build();
    }
}
