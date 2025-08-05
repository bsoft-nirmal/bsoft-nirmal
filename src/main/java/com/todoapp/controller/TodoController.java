package com.todoapp.controller;

import com.todoapp.model.Todo;
import com.todoapp.model.User;
import com.todoapp.service.TodoService;
import com.todoapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;

@Controller
public class TodoController {

    @Autowired
    private TodoService todoService;

    @Autowired
    private UserService userService;

    @GetMapping("/dashboard")
    public String dashboard(Authentication authentication, Model model,
                           @RequestParam(value = "filter", required = false, defaultValue = "all") String filter,
                           @RequestParam(value = "search", required = false) String search) {
        
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }

        List<Todo> todos;
        
        if (search != null && !search.trim().isEmpty()) {
            todos = todoService.searchTodos(user, search.trim());
            model.addAttribute("search", search);
        } else {
            switch (filter) {
                case "pending":
                    todos = todoService.findPendingTodos(user);
                    break;
                case "completed":
                    todos = todoService.findCompletedTodos(user);
                    break;
                default:
                    todos = todoService.findAllByUser(user);
                    break;
            }
        }

        model.addAttribute("todos", todos);
        model.addAttribute("filter", filter);
        model.addAttribute("pendingCount", todoService.countPendingTodos(user));
        model.addAttribute("completedCount", todoService.countCompletedTodos(user));
        model.addAttribute("user", user);
        model.addAttribute("newTodo", new Todo());
        model.addAttribute("priorities", Todo.Priority.values());

        return "todo/dashboard";
    }

    @PostMapping("/todos")
    public String createTodo(@Valid @ModelAttribute("newTodo") Todo todo,
                            BindingResult result,
                            Authentication authentication,
                            RedirectAttributes redirectAttributes) {
        
        if (result.hasErrors()) {
            redirectAttributes.addFlashAttribute("error", "Please provide a valid title for the todo.");
            return "redirect:/dashboard";
        }

        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }

        try {
            todoService.createTodo(todo.getTitle(), todo.getDescription(), todo.getPriority(), user);
            redirectAttributes.addFlashAttribute("success", "Todo created successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to create todo. Please try again.");
        }

        return "redirect:/dashboard";
    }

    @GetMapping("/todos/{id}/edit")
    public String editTodoPage(@PathVariable Long id, Authentication authentication, Model model) {
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }

        Optional<Todo> optionalTodo = todoService.findById(id);
        if (!optionalTodo.isPresent() || !todoService.isOwner(id, user)) {
            return "redirect:/dashboard";
        }

        model.addAttribute("todo", optionalTodo.get());
        model.addAttribute("priorities", Todo.Priority.values());
        return "todo/edit";
    }

    @PostMapping("/todos/{id}/edit")
    public String updateTodo(@PathVariable Long id,
                            @RequestParam String title,
                            @RequestParam(required = false) String description,
                            @RequestParam Todo.Priority priority,
                            Authentication authentication,
                            RedirectAttributes redirectAttributes) {
        
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }

        if (!todoService.isOwner(id, user)) {
            redirectAttributes.addFlashAttribute("error", "Unauthorized access!");
            return "redirect:/dashboard";
        }

        try {
            Todo updatedTodo = todoService.updateTodo(id, title, description, priority);
            if (updatedTodo != null) {
                redirectAttributes.addFlashAttribute("success", "Todo updated successfully!");
            } else {
                redirectAttributes.addFlashAttribute("error", "Failed to update todo.");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to update todo. Please try again.");
        }

        return "redirect:/dashboard";
    }

    @PostMapping("/todos/{id}/toggle")
    public String toggleTodo(@PathVariable Long id, Authentication authentication, RedirectAttributes redirectAttributes) {
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }

        if (!todoService.isOwner(id, user)) {
            redirectAttributes.addFlashAttribute("error", "Unauthorized access!");
            return "redirect:/dashboard";
        }

        try {
            Todo todo = todoService.toggleComplete(id);
            if (todo != null) {
                String status = todo.isCompleted() ? "completed" : "pending";
                redirectAttributes.addFlashAttribute("success", "Todo marked as " + status + "!");
            } else {
                redirectAttributes.addFlashAttribute("error", "Failed to update todo status.");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to update todo status. Please try again.");
        }

        return "redirect:/dashboard";
    }

    @PostMapping("/todos/{id}/delete")
    public String deleteTodo(@PathVariable Long id, Authentication authentication, RedirectAttributes redirectAttributes) {
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }

        try {
            boolean deleted = todoService.deleteTodo(id, user);
            if (deleted) {
                redirectAttributes.addFlashAttribute("success", "Todo deleted successfully!");
            } else {
                redirectAttributes.addFlashAttribute("error", "Failed to delete todo or unauthorized access.");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to delete todo. Please try again.");
        }

        return "redirect:/dashboard";
    }

    private User getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        
        String username = authentication.getName();
        Optional<User> user = userService.findByUsername(username);
        return user.orElse(null);
    }
}