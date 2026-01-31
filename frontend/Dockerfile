# Étape 1 : Build du frontend
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Étape 2 : Serveur Nginx pour les fichiers statiques
FROM nginx:stable-alpine

# Copier le build Vite dans Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port HTTP
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
