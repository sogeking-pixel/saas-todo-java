package org.example.backend.Service;

import lombok.RequiredArgsConstructor;
import org.example.backend.Dto.Request.TaskRequest;
import org.example.backend.Dto.Response.TaskResponse;
import org.example.backend.Entity.Task;
import org.example.backend.Entity.User;
import org.example.backend.Mapper.TaskMapper;
import org.example.backend.Repository.TaskRepository;
import org.example.backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;

    public List<TaskResponse> findAllByUser(String username)
    {
        var user = userRepository.findByUsername(username).orElseThrow();

        var tasks = this.taskRepository.findByUser(user);
        return tasks.stream()
            .map(taskMapper::toResponseWithUserId).toList();
    }


    public TaskResponse findById(long id)
    {
        var task = taskRepository.findById(id).orElseThrow();
        return taskMapper.toResponseWithUserId(task);
    }

    public TaskResponse save(TaskRequest taskRequest, String username)
    {
        var user = userRepository.findByUsername(username).orElseThrow();
        var task = taskMapper.toEntity(taskRequest);
        task.setUser(user);
        var newTask = taskRepository.save(task);
        return taskMapper.toResponseWithUserId(newTask);
    }

    public void delete(long id)
    {
        var task = taskRepository.findById(id).orElseThrow();
        taskRepository.delete(task);
    }

}
