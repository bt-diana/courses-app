# Dockerfile
FROM node:22.15.0

WORKDIR /root/courses-app/backend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run start:build

CMD [ "node", "./dist/index.js" ]
