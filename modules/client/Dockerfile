FROM node:12-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . ./

EXPOSE 8080
