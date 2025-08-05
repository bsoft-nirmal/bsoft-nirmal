<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Todo App</title>
    <link href="/webjars/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 20px 0;
        }
        .register-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 25px;
        }
        .form-control {
            border-radius: 25px;
            border: 2px solid #e9ecef;
            padding: 12px 20px;
        }
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        .is-invalid {
            border-color: #dc3545;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card register-card">
                    <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <i class="fas fa-user-plus fa-3x text-primary mb-3"></i>
                            <h2 class="card-title">Create Account</h2>
                            <p class="text-muted">Join us and start organizing your tasks</p>
                        </div>

                        <c:if test="${not empty error}">
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <i class="fas fa-exclamation-circle me-2"></i>${error}
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        </c:if>

                        <form:form modelAttribute="user" method="post" action="/register">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text bg-light">
                                            <i class="fas fa-user text-muted"></i>
                                        </span>
                                        <form:input path="username" class="form-control ${not empty usernameError or not empty fieldErrors['username'] ? 'is-invalid' : ''}" 
                                                   placeholder="Username" required="true"/>
                                    </div>
                                    <c:if test="${not empty usernameError}">
                                        <div class="text-danger small mt-1">${usernameError}</div>
                                    </c:if>
                                    <form:errors path="username" cssClass="text-danger small mt-1"/>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text bg-light">
                                            <i class="fas fa-envelope text-muted"></i>
                                        </span>
                                        <form:input path="email" type="email" class="form-control ${not empty emailError or not empty fieldErrors['email'] ? 'is-invalid' : ''}" 
                                                   placeholder="Email" required="true"/>
                                    </div>
                                    <c:if test="${not empty emailError}">
                                        <div class="text-danger small mt-1">${emailError}</div>
                                    </c:if>
                                    <form:errors path="email" cssClass="text-danger small mt-1"/>
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="input-group">
                                    <span class="input-group-text bg-light">
                                        <i class="fas fa-lock text-muted"></i>
                                    </span>
                                    <form:password path="password" class="form-control ${not empty fieldErrors['password'] ? 'is-invalid' : ''}" 
                                                  placeholder="Password (min 6 characters)" required="true"/>
                                </div>
                                <form:errors path="password" cssClass="text-danger small mt-1"/>
                                <div class="text-muted small mt-1">
                                    <i class="fas fa-info-circle me-1"></i>Password must be at least 6 characters long
                                </div>
                            </div>

                            <div class="d-grid mb-3">
                                <button type="submit" class="btn btn-primary btn-lg">
                                    <i class="fas fa-user-plus me-2"></i>Create Account
                                </button>
                            </div>
                        </form:form>

                        <div class="text-center">
                            <p class="text-muted">Already have an account?</p>
                            <a href="/login" class="btn btn-outline-primary">
                                <i class="fas fa-sign-in-alt me-2"></i>Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/webjars/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
</body>
</html>