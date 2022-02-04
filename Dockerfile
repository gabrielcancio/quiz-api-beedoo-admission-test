FROM node

USER node

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]