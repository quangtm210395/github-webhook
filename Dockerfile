FROM node:10.15-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production
CMD ["npm", "start"]