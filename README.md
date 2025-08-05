# Todo App - Spring Boot with JSP

A modern, feature-rich todo application built with Java Spring Boot and JSP frontend, featuring user authentication, priority management, and a beautiful responsive UI.

## 🚀 Features

### Core Features
- **User Authentication**: Secure registration and login system with Spring Security
- **Todo Management**: Create, read, update, delete todos with full CRUD operations
- **Priority System**: Four priority levels (Low, Medium, High, Urgent) with visual indicators
- **Task Status**: Mark todos as completed/pending with toggle functionality
- **Search & Filter**: Search todos by title and filter by status (All, Pending, Completed)
- **Responsive UI**: Modern Bootstrap 5 design with gradient themes and animations

### Technical Features
- **Spring Boot 3.2.0**: Latest Spring Boot framework
- **Spring Security**: JWT-based authentication and authorization
- **Spring Data JPA**: Database operations with Hibernate
- **JSP Views**: Server-side rendered pages with JSTL
- **H2 Database**: In-memory database for development
- **Bootstrap 5**: Modern responsive UI framework
- **Font Awesome**: Beautiful icons throughout the application

## 🛠️ Technology Stack

- **Backend**: Java 17, Spring Boot 3.2.0, Spring Security, Spring Data JPA
- **Frontend**: JSP, JSTL, Bootstrap 5, Font Awesome, jQuery
- **Database**: H2 (in-memory for development)
- **Build Tool**: Maven
- **Authentication**: Spring Security with BCrypt password encoding

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-app
```

### 2. Build the Application
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

### 4. Access the Application
- **Main Application**: [http://localhost:8080](http://localhost:8080)
- **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - JDBC URL: `jdbc:h2:mem:todoapp`
  - Username: `sa`
  - Password: `password`

## 👤 Demo Account

The application comes with a pre-configured demo account:

- **Username**: `demo`
- **Password**: `password123`

The demo account includes sample todos with different priorities to showcase the application features.

## 📱 Application Screenshots

### Login Page
- Clean, modern login interface with gradient background
- Form validation and error handling
- Registration link for new users

### Dashboard
- Statistics cards showing pending, completed, and total tasks
- Priority-based color coding for todos
- Add new todo form with priority selection
- Filter and search functionality
- Responsive design for mobile and desktop

### Todo Management
- Create todos with title, description, and priority
- Edit existing todos with full form validation
- Toggle completion status with visual feedback
- Delete todos with confirmation dialog
- Priority indicators with color-coded badges

## 🔧 Configuration

### Database Configuration
The application uses H2 in-memory database by default. To use a different database:

1. Update `application.properties`:
```properties
# For MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/todoapp
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

2. Add the corresponding database dependency to `pom.xml`.

### Security Configuration
- CSRF protection enabled for forms
- Session-based authentication
- Password encryption with BCrypt
- Role-based access control (USER role)

### JSP Configuration
- Views located in `/src/main/webapp/WEB-INF/jsp/`
- Static resources in `/src/main/resources/static/`
- WebJars support for frontend libraries

## 🏗️ Project Structure

```
src/
├── main/
│   ├── java/com/todoapp/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # Web controllers
│   │   ├── model/          # Entity classes
│   │   ├── repository/     # Data repositories
│   │   ├── service/        # Business logic
│   │   └── TodoAppApplication.java
│   ├── resources/
│   │   ├── static/         # Static resources (CSS, JS)
│   │   └── application.properties
│   └── webapp/WEB-INF/jsp/ # JSP view templates
└── test/                   # Test classes
```

## 🎨 Priority System

The application features a comprehensive priority system:

- **🔴 Urgent**: Critical tasks requiring immediate attention
- **🟠 High**: Important tasks with high priority
- **🔵 Medium**: Standard priority tasks (default)
- **🟢 Low**: Tasks that can be done when time permits

Todos are automatically sorted by priority (Urgent → High → Medium → Low) and then by creation date.

## 🔒 Security Features

- **Authentication**: Username/password login with Spring Security
- **Password Encryption**: BCrypt hashing for secure password storage
- **CSRF Protection**: Cross-site request forgery protection
- **Session Management**: Secure session handling
- **Authorization**: Role-based access control

## 🚀 Development

### Running in Development Mode
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Building for Production
```bash
mvn clean package
java -jar target/todo-app-1.0.0.jar
```

### Running Tests
```bash
mvn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Bootstrap team for the beautiful UI components
- Font Awesome for the comprehensive icon library
- H2 Database for the lightweight development database

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Happy Todo Management! 📝✅**
