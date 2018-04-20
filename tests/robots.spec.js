/**
 * Module dependencies.
 */
const apiUnderTest = require('../src');
const supertest = require('supertest');

/**
 * Setup supertest with our API
 */
const request = supertest.agent(apiUnderTest.listen());

/**
 * Tests for the "robots.txt" route
 */
describe('Reviewly - robots.txt', () => {
  it('should send robots.txt on the main domain', done => {
    request
      .get('/robots.txt')
      .set('host', 'mycs.dev')
      .expect(200)
      .expect('User-agent: *\nDisallow: /', done);
  });

  it('should send robots.txt on subdomains', done => {
    request
      .get('/robots.txt')
      .set('host', 'de.stub.mycs.dev')
      .expect(200)
      .expect('User-agent: *\nDisallow: /', done);
  });
});
