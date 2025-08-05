package com.todoapp.config;

import com.todoapp.model.Todo;
import com.todoapp.model.User;
import com.todoapp.service.TodoService;
import com.todoapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private TodoService todoService;

    @Override
    public void run(String... args) throws Exception {
        // Check if demo user already exists
        if (userService.findByUsername("demo").isEmpty()) {
            // Create demo user
            User demoUser = new User();
            demoUser.setUsername("demo");
            demoUser.setEmail("demo@todoapp.com");
            demoUser.setPassword("password123");
            demoUser = userService.registerUser(demoUser);

            // Create sample todos with different priorities
            todoService.createTodo(
                "Complete project documentation", 
                "Write comprehensive documentation for the todo application including setup and usage instructions", 
                Todo.Priority.HIGH, 
                demoUser
            );

            todoService.createTodo(
                "Fix urgent bug in authentication", 
                "There's a critical security issue that needs immediate attention", 
                Todo.Priority.URGENT, 
                demoUser
            );

            todoService.createTodo(
                "Review code changes", 
                "Review pull requests from team members and provide feedback", 
                Todo.Priority.MEDIUM, 
                demoUser
            );

            todoService.createTodo(
                "Update dependencies", 
                "Update all project dependencies to their latest stable versions", 
                Todo.Priority.LOW, 
                demoUser
            );

            todoService.createTodo(
                "Plan next sprint", 
                "Organize and plan tasks for the upcoming development sprint", 
                Todo.Priority.MEDIUM, 
                demoUser
            );

            // Create a completed todo
            Todo completedTodo = todoService.createTodo(
                "Set up development environment", 
                "Install and configure all necessary development tools", 
                Todo.Priority.HIGH, 
                demoUser
            );
            todoService.toggleComplete(completedTodo.getId());

            System.out.println("Demo data initialized successfully!");
            System.out.println("Demo user credentials:");
            System.out.println("Username: demo");
            System.out.println("Password: password123");
        }
    }
}