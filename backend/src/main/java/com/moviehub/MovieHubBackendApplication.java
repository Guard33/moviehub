package com.moviehub;

import com.moviehub.model.Movie;
import com.moviehub.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class MovieHubBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieHubBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner loadInitialData(MovieRepository repo) {
		return args -> {
			if (repo.count() == 0) {
				List<Movie> movies = List.of(
						new Movie("Dark Storm", "1.jpg", "drama", "8.3", "An intense storm brews.", false),
						new Movie("Whisper of Fate", "2.jpg", "fantasy", "7.7", "Fate whispers its secrets.", false),
						new Movie("Beyond the Edge", "3.jpg", "horror", "6.3", "Terror beyond reality.", false),
						new Movie("Lost in Shadows", "4.jpg", "action", "9.3", "A thrilling mission in the dark.", false),
						new Movie("Echoes of Power", "5.jpg", "fantasy", "6.9", "Power leaves echoes behind.", false),
						new Movie("Grim Reckoning", "6.jpg", "drama", "8.4", "The past demands justice.", false),
						new Movie("Fury's Flight", "7.jpg", "action", "9.8", "High-stakes sky battles.", false),
						new Movie("Path of the Forgotten", "8.jpg", "action", "7.2", "Forgotten heroes rise.", false),
						new Movie("Nightmare's Threshold", "9.jpg", "horror", "1.7", "The nightmare begins.", false),
						new Movie("Eternal Hunt", "10.jpg", "fantasy", "7.5", "The hunt never ends.", false),
						new Movie("Legacy of the Void", "11.jpg", "action", "8.5", "A battle to leave a legacy.", false),
						new Movie("Shadow's Crescent", "12.jpg", "horror", "7.5", "Darkness approaches.", false),
						new Movie("Crimson Dawn", "13.jpg", "fantasy", "8.4", "A new dawn in red.", false),
						new Movie("Silent Kingdom", "14.jpg", "fantasy", "6.5", "A kingdom ruled in silence.", false),
						new Movie("Mystic Rite", "15.jpg", "fantasy", "9.8", "A powerful ancient ritual.", false),
						new Movie("Reign of the Lost", "16.jpg", "horror", "9.1", "Lost souls seek justice.", false),
						new Movie("Timeless Myth", "17.jpg", "drama", "4.0", "A myth that outlives time.", false),
						new Movie("Oath of the Fallen", "18.jpg", "fantasy", "6.3", "An oath never forgotten.", false),
						new Movie("Veil of Night", "19.jpg", "drama", "9.5", "Night hides many truths.", false),
						new Movie("Guardians of Twilight", "20.jpg", "horror", "7.4", "Guardians in the dusk.", false)
				);
				repo.saveAll(movies);
			}
		};
	}
}
