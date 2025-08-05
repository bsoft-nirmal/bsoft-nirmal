package com.todoapp.service;

import com.todoapp.model.Todo;
import com.todoapp.model.User;
import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }
    
    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }
    
    public List<Todo> findAllByUser(User user) {
        return todoRepository.findByUserOrderByPriorityValue(user);
    }
    
    public List<Todo> findByUserAndCompleted(User user, boolean completed) {
        return todoRepository.findByUserAndCompletedOrderByPriorityValue(user, completed);
    }
    
    public List<Todo> findPendingTodos(User user) {
        return findByUserAndCompleted(user, false);
    }
    
    public List<Todo> findCompletedTodos(User user) {
        return findByUserAndCompleted(user, true);
    }
    
    public long countPendingTodos(User user) {
        return todoRepository.countByUserAndCompleted(user, false);
    }
    
    public long countCompletedTodos(User user) {
        return todoRepository.countByUserAndCompleted(user, true);
    }
    
    public List<Todo> searchTodos(User user, String searchTerm) {
        return todoRepository.findByUserAndTitleContainingIgnoreCaseOrderByPriorityDescCreatedAtDesc(user, searchTerm);
    }
    
    public Todo createTodo(String title, String description, Todo.Priority priority, User user) {
        Todo todo = new Todo();
        todo.setTitle(title);
        todo.setDescription(description);
        todo.setPriority(priority);
        todo.setUser(user);
        return save(todo);
    }
    
    public Todo updateTodo(Long id, String title, String description, Todo.Priority priority) {
        Optional<Todo> optionalTodo = findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setTitle(title);
            todo.setDescription(description);
            todo.setPriority(priority);
            return save(todo);
        }
        return null;
    }
    
    public Todo toggleComplete(Long id) {
        Optional<Todo> optionalTodo = findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setCompleted(!todo.isCompleted());
            return save(todo);
        }
        return null;
    }
    
    public boolean deleteTodo(Long id, User user) {
        Optional<Todo> optionalTodo = findById(id);
        if (optionalTodo.isPresent() && optionalTodo.get().getUser().getId().equals(user.getId())) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public boolean isOwner(Long todoId, User user) {
        Optional<Todo> optionalTodo = findById(todoId);
        return optionalTodo.isPresent() && optionalTodo.get().getUser().getId().equals(user.getId());
    }
}