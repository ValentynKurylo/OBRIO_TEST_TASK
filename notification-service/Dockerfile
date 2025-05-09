
FROM node:18-alpine

WORKDIR /usr/src

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
