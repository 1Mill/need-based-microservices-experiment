FROM node:13

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV HOST 0.0.0.0

ENV CORE_RAPIDS_URL ${CORE_RAPIDS_URL}
ENV PORT ${PORT}
ENV PRODUCT_REDIS_HOST ${PRODUCT_REDIS_HOST}
ENV PRODUCT_REDIS_PORT ${PRODUCT_REDIS_PORT}

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
