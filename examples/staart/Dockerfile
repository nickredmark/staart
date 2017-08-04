FROM node:7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN npm install -g yarn
RUN yarn --pure-lockfile
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
