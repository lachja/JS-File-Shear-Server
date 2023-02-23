FROM node:lts-alpine3.17
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build