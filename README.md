# Saga (Server)

Saga is a mood-tracking, goal-tracking diary application that uses smart analysis to help you better learn about you.

## System Requirements

* Node.js
* PostgreSQL w/  `postgres` superuser access
* Redis
* Snyk for security, `type npm i -g snyk`

## Environment Variables

| Key                   | Description           |
|-----------------------|-----------------------|
|SAGA_PASSWORD         |Password for the saga user account, don't be predictable|
|NODE_ENV               |Either `development`, `stage` or `production` (`test` is reserved for integration testing)|
|PORT                   |Port number|
|SECRET                 |Secret for web tokens, don't be predictable|
|PG_PASSWORD            |`postgres` superuser role password, this is needed in order to create the Rail user and database (optional if there is no password)|
|SAGA_HOST              |PostgreSQL host, defaults to `localhost`|
|EXP_TIME               |Token expiration (ms/date format) defaults to `1d`|

## Starting the App

* type `npm install` to install all dependencies before you run the app the first time
* type `node .` to start the app

## Testing

* You can run integration tests by typing `npm run test-int`
* Tests automatically set the `NODE_ENV` environment variable to `test` so you don't have to worry about messing up your development database
* Test data is destroyed after each test and the `rail_test` database is reserved for testing, so don't use it for anything else you don't want to lose
* Please run tests before **every** PR
