FROM node:12-alpine

RUN apk --no-cache add --virtual \
      builds-deps \
      build-base \
      python

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . ./

EXPOSE 3000
