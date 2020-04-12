FROM node:alpine AS base

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN apk --no-cache add python make g++ bash

USER node

WORKDIR /home/node/app

COPY package*.json ./

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

COPY bin ./bin

# ---- Dependencies ----
FROM base AS dependencies

RUN npm set progress=false && npm config set depth 0

RUN npm install

# ---- Release ----
FROM base AS release

RUN npm install pm2 -g

COPY --from=dependencies /home/node/app/node_modules ./node_modules

COPY --chown=node:node . .

EXPOSE 7000

RUN npm run build

CMD [ "pm2-runtime", "./dist/www/index.js" ]
