FROM node:14.15.4 as stage 

WORKDIR /usr/src 

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run start