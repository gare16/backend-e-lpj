FROM node:20-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json .
RUN npm install

COPY prisma prisma
COPY src src

RUN npx prisma generate

EXPOSE 8080
CMD [ "npm", "start"]