package com.todoapp.repository;

import com.todoapp.model.Todo;
import com.todoapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    List<Todo> findByUserOrderByPriorityDescCreatedAtDesc(User user);
    
    List<Todo> findByUserAndCompletedOrderByPriorityDescCreatedAtDesc(User user, boolean completed);
    
    @Query("SELECT t FROM Todo t WHERE t.user = :user ORDER BY " +
           "CASE t.priority " +
           "WHEN 'URGENT' THEN 4 " +
           "WHEN 'HIGH' THEN 3 " +
           "WHEN 'MEDIUM' THEN 2 " +
           "WHEN 'LOW' THEN 1 " +
           "END DESC, t.createdAt DESC")
    List<Todo> findByUserOrderByPriorityValue(@Param("user") User user);
    
    @Query("SELECT t FROM Todo t WHERE t.user = :user AND t.completed = :completed ORDER BY " +
           "CASE t.priority " +
           "WHEN 'URGENT' THEN 4 " +
           "WHEN 'HIGH' THEN 3 " +
           "WHEN 'MEDIUM' THEN 2 " +
           "WHEN 'LOW' THEN 1 " +
           "END DESC, t.createdAt DESC")
    List<Todo> findByUserAndCompletedOrderByPriorityValue(@Param("user") User user, @Param("completed") boolean completed);
    
    long countByUserAndCompleted(User user, boolean completed);
    
    List<Todo> findByUserAndTitleContainingIgnoreCaseOrderByPriorityDescCreatedAtDesc(User user, String title);
}