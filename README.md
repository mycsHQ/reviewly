# Reviewly

[![CircleCI](https://img.shields.io/circleci/project/github/mycsHQ/reviewly.svg?style=flat-square)](https://circleci.com/gh/mycsHQ/reviewly)

> Serve the content of a folder based on a subdomain (we use it to review our feature branch, hence the name)

## Description

This app will serve the content of a folder based on the subdomain.  
eg. `de.my-branch.mydomain.tld` will serve the content of the folder `$HOME/features/my-branch`.

This app also contains a webhook to delete a folder when a branch is deleted.

## Getting started

```bash
git clone git@github.com:mycsHQ/reviewly.git
cd reviewly
yarn install
yarn run start
```

### Prerequisites

Since we are using async/await with koa@2, this app needs to run on >= Node7.

### Running the tests

```bash
yarn test
```

## Built with

- Koa2 is used to serve the folders and its plugin koa-send.
- pm2 is used for the deployment and monitoring of the app
- Circleci is used for continuous integration. Circleci will start the app, run the tests and deploy if all pass.
- (optional) yarn as dependency manager
- mocha, should and supertest for testing the server
- eslint for linting the codebase

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


## Continuous deployment

Thanks to pm2 deploy, circleci will automatically deployd a new release on a given server.