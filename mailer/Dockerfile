FROM node:12

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY server.js .

EXPOSE 8082

ENV SMTP_USERNAME=
ENV SMTP_PASSWORD=

CMD [ "node", "server.js" ]
