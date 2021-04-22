FROM node:12.18.0-stretch AS builder

WORKDIR /arch-server

COPY ./src .

RUN yarn install

ENTRYPOINT node ./server.js