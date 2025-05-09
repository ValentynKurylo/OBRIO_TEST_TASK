
FROM node:16

WORKDIR /usr/src

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]

