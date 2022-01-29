FROM node:alpine3.11
WORKDIR /usr/node-dir
COPY package.json .
COPY yarn.lock .
RUN yarn install 
COPY . .
EXPOSE 3000
CMD ["yarn","run","start:prod"]


