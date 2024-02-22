FROM node:20-alpine
COPY . .
RUN npm install
WORKDIR /backend
CMD ["npm", "start"]
EXPOSE 8081


