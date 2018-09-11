FROM node:8.11.4-alpine

ENV TZ Europe/Moscow


COPY ./package.json /tmp/package.json
COPY ./package-lock.json /tmp/package-lock.json

COPY ./package.json /var/www/
COPY ./package-lock.json /var/www/
COPY ./favicon.ico /var/www/
COPY ./tsconfig.json /var/www/
COPY ./webpack.config.js /var/www/
COPY ./yarn.lock /var/www/

RUN cd /tmp && npm install
RUN mkdir -p /var/www && cp -a /tmp/node_modules /var/www/

WORKDIR /var/www

CMD ["npm", "start"]
