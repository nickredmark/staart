FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
