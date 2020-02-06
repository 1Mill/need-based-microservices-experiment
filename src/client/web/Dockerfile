FROM node:13

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV HOST 0.0.0.0
ENV PORT 8080

EXPOSE 8080

CMD ["nuxt"]
