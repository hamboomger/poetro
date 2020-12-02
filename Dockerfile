FROM node:12-alpine

RUN apk --no-cache add --virtual \
      builds-deps \
      build-base \
      python

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
WORKDIR ./src/client
COPY src/client/package.json src/client/package-lock.json ./
RUN npm i
WORKDIR /app
COPY . .

EXPOSE 8080 3000 27017
