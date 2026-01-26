FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build (will create dist if vite build is correct)
RUN npm run build

# Debug: show what got built (visible in Dokploy logs)
RUN echo "=== ROOT ===" && ls -lah /app \
 && echo "=== DIST ===" && ls -lah /app/dist || true \
 && echo "=== DIST/ASSETS ===" && ls -lah /app/dist/assets || true

FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# SPA fallback
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
