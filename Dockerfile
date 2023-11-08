FROM node:18-buster-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .


EXPOSE 7000

CMD ["node", "src/server.js"]
