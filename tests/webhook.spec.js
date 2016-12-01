process.env.ROOT_FOLDER = './tests';
/**
 * Module dependencies.
 */
const fs = require('fs-extra');
const path = require('path');
const apiUnderTest = require('../src');
const supertest = require('supertest');

/**
 * Setup supertest with our API
 */
const request = supertest.agent(apiUnderTest.listen());

/**
 * Tests for the webhook route
 */
describe('Reviewly - Webhook', () => {

  it('should get the branch from body and delete the folder', (done) => {
    const branchName = 'branch-name-to-delete';
    const fullPath = path.join(process.env.ROOT_FOLDER, 'features', branchName);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
      fs.writeFileSync(path.join(fullPath, 'index.html'), 'hello world');
    }

    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .send({
        ref: branchName
      })
      .expect(200, `${ branchName } has been deleted`)
      .end((err) => {
        if (err) return done(err);
        if (fs.existsSync(fullPath)) throw new Error('Folder should be deleted');
        done();
      });
  });

  it('should get the branch from body and delete the folder even when branch name is given in uppercase', (done) => {
    const branchName = 'branchNameToDelete'.toLowerCase();
    const fullPath = path.join(process.env.ROOT_FOLDER, 'features', branchName);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
      fs.writeFileSync(path.join(fullPath, 'index.html'), 'hello world');
    }

    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .send({
        ref: branchName.toUpperCase()
      })
      .expect(200, `${ branchName.toUpperCase() } has been deleted`)
      .end((err) => {
        if (err) return done(err);
        if (fs.existsSync(fullPath)) throw new Error('Folder should be deleted');
        done();
      });
  });

  it('should not delete subdirectory', (done) => {
    const branchNameWithUpDir = '../../../home/root';

    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .send({
        ref: branchNameWithUpDir
      })
      .expect(200, `${ branchNameWithUpDir } not found`, done);
  });

  it('should return a message if folder not found', (done) => {
    const folderDoesntExist = 'folderDoesntExist';
    
    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .send({
        ref: folderDoesntExist
      })
      .expect(200, `${ folderDoesntExist } not found`, done);
  });

  it('should return a message if no branchName was found in request', (done) => {
    request
      .post('/webhook')
      .set('host', 'mycs.dev')
      .expect(200, `No branchName found in request`, done);
  });
});