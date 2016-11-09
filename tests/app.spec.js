const apiUnderTest = require('../src');
let os = require('os');
const supertest = require('supertest');

const request = supertest.agent(apiUnderTest.listen());

describe('404', () => {
  it('should return 404', (done) => {
    request
      .get('/')
      .expect(404, done);
  });
});