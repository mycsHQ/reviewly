/**
 * Module dependencies.
 */
const Koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();

/**
 * Internal dependencies.
 */
const config = require('./config')();
const wildcard = require('./routes/wildcard');
const webhook = require('./routes/webhook');
const robots = require('./routes/robots');

/**
 * Setup Koa app
 */
const app = new Koa();

/**
 * Add Koa Middlewares
 */
app.use(logger());
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

/**
 * Assign routes
 */
router.post('/webhook', webhook);
router.get('/robots.txt', robots);
router.get('(.*)', wildcard);

/**
 * Start the server
 */
app.listen(config.port, () => {
  /* eslint-disable no-console */
  console.log(`Reviewly successfuly started on port ${ config.port } with NODE_ENV ${ process.env.NODE_ENV }`)
  /* eslint-enable no-console */
});

/**
 * Module exports.
 * @public
 */
module.exports = app;
