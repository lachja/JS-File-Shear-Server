FROM node:lts-alpine3.17
WORKDIR /app
EXPOSE 5173

COPY package.json ./
COPY package-lock.json ./
RUN npm install

RUN npm run build

COPY ./build/ ./

CMD ["node", "build/index.js"]
