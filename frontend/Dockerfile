# ---------- Build stage ----------
    FROM node:18-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    # Build for production
    RUN npm run build
    
    # ---------- Nginx stage ----------
    FROM nginx:1.25-alpine
    # Copy our nginx config
    COPY nginx.config /etc/nginx/conf.d/default.conf
    # Copy React build to Nginx html root
    COPY --from=builder /app/build /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx","-g","daemon off;"]
    