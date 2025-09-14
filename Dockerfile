FROM node:18

WORKDIR /usr/src/app

COPY myapp/package*.json ./
RUN npm install

COPY . .

EXPOSE 8888

ENV NODE_ENV=production

CMD ["node", "app.js"]
