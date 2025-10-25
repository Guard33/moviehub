# Movie Hub

Movie Hub is a full-stack watchlist web app designed to let users discover, save, and explore movies—all with a slick interface and type-safe code.

---

##  Live Website
View the website at:  
**[Live Site](http://3.146.37.153)**

---

##  Architecture & Stack
- **Backend**: Spring Boot REST API managing persistence and business logic  
- **Database**: MongoDB Atlas  
- **Frontend**: React with TypeScript, styled using CSS Modules/Tailwind  
- **Deployment**: Containerized via Docker + orchestrated using `docker-compose`  

---

##  Features
- Browse popular titles and search using keywords or filters  
- View detailed movie info (synopsis, ratings, posters, etc.)  
- Add/remove movies from your personal watchlist  
- Responsive layout with a modern, clean UI  

---

##  Versions / Changelog

### v0.1.0 (07/13/2025)
- Initial **Spring Boot** backend setup with CRUD endpoints for movies and users  
- **React** frontend scaffolded with basic layout and navigation  

### v0.2.0 (07/28/2025)
- Integrated **MongoDB Atlas** for persistent data storage  
- Added **Watchlist** functionality (add/remove movies)  

### v0.3.0 (08/10/2025)
- Enhanced UI design with **responsive styling**  
- **Dockerized** both backend and frontend; introduced `docker-compose.yml` for full-stack deployment  

### v0.4.0 (08/15/2025)
- Improved **Nginx configuration** and fixed API routing issues  
- Added **JWT authentication** and user login/register pages  
- Integrated **Axios instance** with `withCredentials` for secure token handling  

### v0.5.0 (09/25/2025)
- Refined **CORS and Spring Security** configuration  
- Added better **controller error handling** and status responses  
- Optimized Docker build for faster restarts and stable deployment  

### v0.6.0 (10/12/2025)
- Major **SecurityConfig** refactor for improved JWT flow  
- Updated React services and CORS handling  
- Deployed production-ready version on **AWS EC2** with Docker  

### v0.7.0 (10/25/2025)
- Implemented **JWT auto-refresh** and token decode improvements  
- Fixed build issues related to `jwt-decode`  
- Enhanced deployment reliability and frontend-backend communication  
