package com.moviedux.service;

import com.moviedux.repository.AppUserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    private final AppUserRepository users;
    public MongoUserDetailsService(AppUserRepository users) { this.users = users; }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var u = users.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new User(u.getUsername(), u.getPassword()
(),
                List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole())));
    }
}
