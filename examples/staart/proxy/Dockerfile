FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8080
ENTRYPOINT [ "npm", "run"]
CMD [ "start" ]
