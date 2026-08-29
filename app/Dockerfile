# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the app (copy the rest of the source)
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine

# Copy the built static assets
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.template.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
