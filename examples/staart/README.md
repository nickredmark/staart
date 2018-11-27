# A Staart example boilerplate

Get this folder to start your own project.

## Bootstrap

```
npm run bootstrap
```

## Config

Configure the following files:

```
api/.env
api/.env.docker
next/.env
next/.env.docker
ooth/.env
ooth/.env.docker
proxy/.env
proxy/.env.docker
```

`.env.docker` files are used when the app is run in a docker environment. The main difference is that
the services can't link to each other using localhost.

## Start Local

Start everything in docker.

```
npm run start:local
```

Access your app under `http://localhost:8080`

## Develop

While developing you won't be running everything in docker, only certain services (`db`, `redis`):

```
npm run start:dev-environment
```

Then start `next`, `ooth`, `api`, `proxy` locally in watchmode.

```
npm run start:dev
```

Access your app under `http://localhost:8080`

## Remote server

On remote server only fill the root `.env` and the various `.env.docker` files then start with

```
npm run start
```
