<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Todo - Todo App</title>
    <link href="/webjars/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .edit-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 25px;
        }
        .form-control, .form-select {
            border-radius: 10px;
            border: 2px solid #e9ecef;
        }
        .form-control:focus, .form-select:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="/dashboard">
                <i class="fas fa-tasks me-2"></i>Todo App
            </a>
            <div class="navbar-nav ms-auto">
                <a href="/dashboard" class="btn btn-outline-light btn-sm">
                    <i class="fas fa-arrow-left me-1"></i>Back to Dashboard
                </a>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card edit-card">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">
                            <i class="fas fa-edit me-2"></i>Edit Todo
                        </h4>
                    </div>
                    <div class="card-body p-4">
                        <form method="post" action="/todos/${todo.id}/edit">
                            <div class="mb-4">
                                <label for="title" class="form-label">
                                    <i class="fas fa-heading me-2 text-primary"></i>Title
                                </label>
                                <input type="text" class="form-control form-control-lg" id="title" name="title" 
                                       value="${todo.title}" required>
                            </div>

                            <div class="mb-4">
                                <label for="description" class="form-label">
                                    <i class="fas fa-align-left me-2 text-primary"></i>Description
                                </label>
                                <textarea class="form-control" id="description" name="description" rows="4" 
                                          placeholder="Add a description (optional)">${todo.description}</textarea>
                            </div>

                            <div class="mb-4">
                                <label for="priority" class="form-label">
                                    <i class="fas fa-flag me-2 text-primary"></i>Priority
                                </label>
                                <select class="form-select form-select-lg" id="priority" name="priority" required>
                                    <c:forEach items="${priorities}" var="priority">
                                        <option value="${priority}" ${todo.priority == priority ? 'selected' : ''}>
                                            ${priority.displayName}
                                        </option>
                                    </c:forEach>
                                </select>
                                <div class="form-text">
                                    <i class="fas fa-info-circle me-1"></i>
                                    Higher priority todos will appear at the top of your list
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <button type="submit" class="btn btn-primary btn-lg w-100">
                                        <i class="fas fa-save me-2"></i>Update Todo
                                    </button>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <a href="/dashboard" class="btn btn-outline-secondary btn-lg w-100">
                                        <i class="fas fa-times me-2"></i>Cancel
                                    </a>
                                </div>
                            </div>

                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                        </form>
                    </div>
                </div>

                <!-- Todo Info Card -->
                <div class="card mt-4">
                    <div class="card-body">
                        <h6 class="card-title text-muted">
                            <i class="fas fa-info-circle me-2"></i>Todo Information
                        </h6>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="mb-1">
                                    <strong>Status:</strong> 
                                    <span class="badge bg-${todo.completed ? 'success' : 'warning'}">
                                        ${todo.completed ? 'Completed' : 'Pending'}
                                    </span>
                                </p>
                                <p class="mb-1">
                                    <strong>Current Priority:</strong> 
                                    <span class="badge bg-${todo.priority == 'URGENT' ? 'danger' : todo.priority == 'HIGH' ? 'warning' : todo.priority == 'MEDIUM' ? 'info' : 'success'}">
                                        ${todo.priority.displayName}
                                    </span>
                                </p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1">
                                    <strong>Created:</strong> 
                                    <fmt:formatDate value="${todo.createdAt}" pattern="MMM dd, yyyy 'at' HH:mm"/>
                                </p>
                                <c:if test="${todo.updatedAt != todo.createdAt}">
                                    <p class="mb-1">
                                        <strong>Last Updated:</strong> 
                                        <fmt:formatDate value="${todo.updatedAt}" pattern="MMM dd, yyyy 'at' HH:mm"/>
                                    </p>
                                </c:if>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/webjars/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
</body>
</html>