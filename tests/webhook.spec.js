process.env.ROOT_FOLDER = './tests';

const fs = require('fs');
const path = require('path');
const apiUnderTest = require('../src');
const supertest = require('supertest');

const request = supertest.agent(apiUnderTest.listen());
const branchName = 'branchNameToDelete';
const fullPath = path.join(process.env.ROOT_FOLDER, 'features', branchName);

describe('Reviewly - Webhook', () => {

  it('should get the branch from body and delete the folder', (done) => {
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .send({
        ref: branchName
      })
      .expect(200)
      .expect('${ branchName } has been deleted')
      .end(() => {
        if (fs.existsSync(fullPath)) throw new Error('Folder should be deleted');
        done();
      });
  });

  it('should return a message if folder not found', (done) => {
    const folderDoesntExist = 'folderDoesntExist';
    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .send({
        ref: folderDoesntExist
      })
      .expect(200)
      .expect(`${ folderDoesntExist } not found`, done);
  });

  it('should return a message if no branchName was found in request', (done) => {
    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .expect(200)
      .expect(`No branchName found in request`, done);
  });
});