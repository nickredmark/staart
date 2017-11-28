FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN npm install -g yarn
RUN yarn --pure-lockfile
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
