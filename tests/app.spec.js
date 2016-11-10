process.env.ROOT_FOLDER = './tests';

const apiUnderTest = require('../src');
const supertest = require('supertest');

const request = supertest.agent(apiUnderTest.listen());

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
});