FROM node:13

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV HOST 0.0.0.0

ENV PORT ${PORT}

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
