package com.darlemlih.apiculture.repositories;

import com.darlemlih.apiculture.entities.Cart;
import com.darlemlih.apiculture.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
    Optional<Cart> findBySessionId(String sessionId);
}
