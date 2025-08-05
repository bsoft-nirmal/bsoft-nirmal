<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Todo App</title>
    <link href="/webjars/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .todo-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .todo-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }
        .priority-urgent { border-left: 5px solid #dc3545; }
        .priority-high { border-left: 5px solid #fd7e14; }
        .priority-medium { border-left: 5px solid #0dcaf0; }
        .priority-low { border-left: 5px solid #198754; }
        .completed-todo {
            opacity: 0.7;
            text-decoration: line-through;
        }
        .stats-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
        }
        .btn-rounded {
            border-radius: 25px;
        }
        .add-todo-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
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
                <span class="navbar-text me-3">
                    <i class="fas fa-user me-1"></i>Welcome, ${user.username}!
                </span>
                <form action="/logout" method="post" class="d-inline">
                    <button type="submit" class="btn btn-outline-light btn-sm">
                        <i class="fas fa-sign-out-alt me-1"></i>Logout
                    </button>
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                </form>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <!-- Flash Messages -->
        <c:if test="${not empty success}">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>${success}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        </c:if>

        <c:if test="${not empty error}">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-circle me-2"></i>${error}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        </c:if>

        <!-- Statistics Cards -->
        <div class="row mb-4">
            <div class="col-md-4 mb-3">
                <div class="card stats-card">
                    <div class="card-body text-center">
                        <i class="fas fa-clock fa-2x mb-2"></i>
                        <h3>${pendingCount}</h3>
                        <p class="mb-0">Pending Tasks</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card stats-card">
                    <div class="card-body text-center">
                        <i class="fas fa-check-circle fa-2x mb-2"></i>
                        <h3>${completedCount}</h3>
                        <p class="mb-0">Completed Tasks</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card stats-card">
                    <div class="card-body text-center">
                        <i class="fas fa-list fa-2x mb-2"></i>
                        <h3>${pendingCount + completedCount}</h3>
                        <p class="mb-0">Total Tasks</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Add Todo Form -->
            <div class="col-lg-4 mb-4">
                <div class="card add-todo-card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-plus me-2"></i>Add New Todo</h5>
                    </div>
                    <div class="card-body">
                        <form:form modelAttribute="newTodo" method="post" action="/todos">
                            <div class="mb-3">
                                <form:input path="title" class="form-control" placeholder="Todo title..." required="true"/>
                            </div>
                            <div class="mb-3">
                                <form:textarea path="description" class="form-control" rows="3" placeholder="Description (optional)"/>
                            </div>
                            <div class="mb-3">
                                <form:select path="priority" class="form-select">
                                    <c:forEach items="${priorities}" var="priority">
                                        <form:option value="${priority}" label="${priority.displayName}"/>
                                    </c:forEach>
                                </form:select>
                            </div>
                            <button type="submit" class="btn btn-light btn-rounded w-100">
                                <i class="fas fa-plus me-2"></i>Add Todo
                            </button>
                        </form:form>
                    </div>
                </div>
            </div>

            <!-- Todo List -->
            <div class="col-lg-8">
                <!-- Filter and Search -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <div class="btn-group" role="group">
                                    <a href="/dashboard?filter=all" class="btn ${filter == 'all' ? 'btn-primary' : 'btn-outline-primary'} btn-sm">
                                        All (${pendingCount + completedCount})
                                    </a>
                                    <a href="/dashboard?filter=pending" class="btn ${filter == 'pending' ? 'btn-primary' : 'btn-outline-primary'} btn-sm">
                                        Pending (${pendingCount})
                                    </a>
                                    <a href="/dashboard?filter=completed" class="btn ${filter == 'completed' ? 'btn-primary' : 'btn-outline-primary'} btn-sm">
                                        Completed (${completedCount})
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <form method="get" action="/dashboard">
                                    <div class="input-group">
                                        <input type="text" name="search" class="form-control" placeholder="Search todos..." value="${search}">
                                        <button type="submit" class="btn btn-outline-primary">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Todo Items -->
                <c:choose>
                    <c:when test="${empty todos}">
                        <div class="card todo-card">
                            <div class="card-body text-center py-5">
                                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                                <h5 class="text-muted">No todos found</h5>
                                <p class="text-muted">Start by adding your first todo above!</p>
                            </div>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <c:forEach items="${todos}" var="todo">
                            <div class="card todo-card mb-3 priority-${todo.priority.name().toLowerCase()} ${todo.completed ? 'completed-todo' : ''}">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-md-8">
                                            <div class="d-flex align-items-center mb-2">
                                                <h6 class="mb-0 me-2 ${todo.completed ? 'text-decoration-line-through' : ''}">${todo.title}</h6>
                                                <span class="badge bg-${todo.priority == 'URGENT' ? 'danger' : todo.priority == 'HIGH' ? 'warning' : todo.priority == 'MEDIUM' ? 'info' : 'success'} ms-2">
                                                    ${todo.priority.displayName}
                                                </span>
                                                <c:if test="${todo.completed}">
                                                    <span class="badge bg-success ms-2">
                                                        <i class="fas fa-check me-1"></i>Completed
                                                    </span>
                                                </c:if>
                                            </div>
                                            <c:if test="${not empty todo.description}">
                                                <p class="text-muted small mb-2 ${todo.completed ? 'text-decoration-line-through' : ''}">${todo.description}</p>
                                            </c:if>
                                            <small class="text-muted">
                                                <i class="fas fa-calendar me-1"></i>
                                                <fmt:formatDate value="${todo.createdAt}" pattern="MMM dd, yyyy 'at' HH:mm"/>
                                            </small>
                                        </div>
                                        <div class="col-md-4 text-end">
                                            <div class="btn-group-vertical btn-group-sm" role="group">
                                                <form method="post" action="/todos/${todo.id}/toggle" class="d-inline">
                                                    <button type="submit" class="btn ${todo.completed ? 'btn-warning' : 'btn-success'} btn-sm mb-1">
                                                        <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'} me-1"></i>
                                                        ${todo.completed ? 'Undo' : 'Complete'}
                                                    </button>
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                                </form>
                                                <a href="/todos/${todo.id}/edit" class="btn btn-primary btn-sm mb-1">
                                                    <i class="fas fa-edit me-1"></i>Edit
                                                </a>
                                                <form method="post" action="/todos/${todo.id}/delete" class="d-inline" 
                                                      onsubmit="return confirm('Are you sure you want to delete this todo?')">
                                                    <button type="submit" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash me-1"></i>Delete
                                                    </button>
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>

    <script src="/webjars/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
</body>
</html>