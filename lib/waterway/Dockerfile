FROM node:latest

WORKDIR /app

COPY package-lock.json package.json ./
RUN npm install

CMD [ "npm", "run", "test" ]
