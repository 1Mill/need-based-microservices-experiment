FROM node:13

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV HOST 0.0.0.0

ENV PORT ${PORT}
ENV PRODUCT_ASK_URL ${PRODUCT_ASK_URL}

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
