process.env.ROOT_FOLDER = './tests';

const apiUnderTest = require('../src');
const supertest = require('supertest');

const request = supertest.agent(apiUnderTest.listen());

describe('Reviewly', () => {
  it('should return content of index.html (Hello World!)', (done) => {
    request
      .get('/')
      .set('host', 'stub.de.mycs.dev')
      .expect(200)
      .expect('Hello World!', done);
  });
  it('should return 404 if file not found', (done) => {
    request
      .get('/file-does-not-exist.html')
      .set('host', 'stub.de.hello.dev')
      .expect(404, done);
  });
});