process.env.ROOT_FOLDER = './tests';

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
 * Tests for the Wildcard (/*) route
 */
describe('Reviewly', () => {
  it('should return content of index.html (Hello World!)', (done) => {
    request
      .get('/')
      .set('host', 'de.stub.mycs.dev')
      .expect(200)
      .expect('Hello World!', done);
  });
  it('should return index.html content', (done) => {
    request
      .get('/file-does-not-exist.html')
      .set('host', 'de.stub.hello.dev')
      .expect(200)
      .expect('Hello World!', done);
  });
  it('should return list of existing features if feature not found', (done) => {
    request
      .get('/')
      .set('host', 'de.EXIST-ME-NOT.hello.dev')
      .expect(200)
      .expect('This feature-branch was not found, here\'s what is already deployed on this server<br><a href="http://de.stub.hello.dev">stub</a><br>', done);
  });
});