[![Build](https://github.com/Wenish/nestjs-mongoose-casl/actions/workflows/build.yml/badge.svg)](https://github.com/Wenish/nestjs-mongoose-casl/actions/workflows/build.yml)

[![Test](https://github.com/Wenish/nestjs-mongoose-casl/actions/workflows/test.yml/badge.svg)](https://github.com/Wenish/nestjs-mongoose-casl/actions/workflows/test.yml)

## Installation

```bash
npm ci
```

## Running tests

```bash
npm test
```


## Running the app

Add `.env` file in the root folder of the repository with following content.

`DATABASE_MONGODB_URI=mongodb://localhost:27017`

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

The App should be available on `localhost:3001/api`

