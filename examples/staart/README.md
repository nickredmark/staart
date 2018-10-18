# A Staart example boilerplate

Get this folder to start your own project.

## Bootstrap

```
npm run bootstrap
```

## Config

Configurations can be found in .env files in the various microservice folders.

## Start Local

Start everything in docker.

```
npm run start:local
```

Access your app under `http://localhost:8080`

## Develop

While developing you won't be running everything in docker, only certain services (`db`, `redis`, `proxy`):

```
npm run start:dev-environment
```

Then start `next`, `ooth` and `api` locally in watchmode.

```
npm run start:dev
```

Access your app under `http://localhost:8080`
