FROM node:18-alpine

WORKDIR /app

COPY public/ /app/public/
COPY src/ /app/src/
COPY package.json .

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000