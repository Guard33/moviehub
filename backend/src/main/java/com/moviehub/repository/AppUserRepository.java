package com.moviehub.repository;

import com.moviehub.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AppUserRepository extends MongoRepository<AppUser, String> {
    boolean existsByUsername(String username);
    Optional<AppUser> findByUsername(String username);
}
