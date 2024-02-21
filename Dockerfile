FROM node:20.9.0

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start"]
