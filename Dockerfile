FROM node:12-alpine
WORKDIR /app
COPY package.json .
RUN npm i
WORKDIR ./src/client
COPY src/client/package.json .
RUN npm i
WORKDIR ../../
COPY . .

EXPOSE 8080 3000 27017
