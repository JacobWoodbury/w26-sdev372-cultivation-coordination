# --- Vite production build (Alpine, small) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:20-bookworm-slim AS node-test
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci
COPY . .
RUN npx playwright install --with-deps chromium
ENV CI=1
CMD ["npm", "test"]

# --- Production frontend (default image) ---
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
