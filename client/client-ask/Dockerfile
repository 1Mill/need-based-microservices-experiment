FROM node:13

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV CORE_RAPIDS_URL ${CORE_RAPIDS_URL}
ENV HOST 0.0.0.0
ENV PORT 8080

EXPOSE 8080

CMD ["npm", "run", "start"]
