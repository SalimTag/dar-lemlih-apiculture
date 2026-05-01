package com.darlemlih.apiculture.repositories;

import com.darlemlih.apiculture.entities.Address;
import com.darlemlih.apiculture.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
}
