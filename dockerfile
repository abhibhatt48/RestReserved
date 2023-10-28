
FROM node:latest as build

WORKDIR /app

COPY customer-app-frontend/package.json customer-app-frontend/package-lock.json ./

RUN npm install

COPY customer-app-frontend ./

RUN npm run build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

