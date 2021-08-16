FROM node:12.18.0-stretch AS builder

USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

COPY --chown=node ./src/server.js ./

RUN yarn install

# Bundle app source code
COPY --chown=node . .

RUN yarn build

ENTRYPOINT node ./server.js