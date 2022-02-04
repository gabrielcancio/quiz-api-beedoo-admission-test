FROM node

USER node

WORKDIR /usr/app

COPY . .

EXPOSE 3000