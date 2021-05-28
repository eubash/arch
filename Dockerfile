FROM node:12.18.0-stretch AS builder

WORKDIR /arch-server

COPY ./src .

COPY package.json .

ENV NODE_ENV=development

RUN yarn install

ENTRYPOINT node ./server-reg.js