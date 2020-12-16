FROM node:14

WORKDIR /usr/src/

COPY ./package*.json .
COPY ./yarn.lock .

COPY ./app ./app
COPY .env.prod .env.prod

RUN yarn workspace app install
RUN yarn workspace app build

RUN rm -rf node_modules
RUN yarn workspace app install --production

WORKDIR /usr/src/app
EXPOSE 3000
CMD ["yarn", "prod"]