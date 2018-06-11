import { assert } from 'chai';
import * as path from 'path';
import * as fs from '../fs';

describe('fs', function () {

  describe('isDirectory()', function () {

    it('returns `false` for empty values', async function () {
      const status = await fs.isDirectory('');
      assert.equal(status, false);
    });

    it('returns `true` for valid directory path', async function () {
      const dest = path.join('.');
      const status = await fs.isDirectory(dest);
      assert.equal(status, true);
    });

    it('returns `false` for invalid directory path', async function () {
      const dest = path.join('package.json');
      const status = await fs.isDirectory(dest);
      assert.equal(status, false);
    });

  });

  describe('isFile()', function () {

    it('returns `false` for empty values', async function () {
      const status = await fs.isFile('');
      assert.equal(status, false);
    });

    it('returns `true` for valid file path', async function () {
      const dest = path.join('package.json');
      const status = await fs.isFile(dest);
      assert.equal(status, true);
    });

    it('returns `false` for invalid file path', async function () {
      const dest = path.join('.');
      const status = await fs.isFile(dest);
      assert.equal(status, false);
    });

  });

  describe('ensureDirectory()', function () {

    it('creates sub directory', async function () {
      const dest = path.join('node_modules', Date.now().toString());
      const success = await fs.ensureDirectory(dest).then(() => true).catch(() => false);
      const exists = await fs.isDirectory(dest);
      assert.equal(success, true);
      assert.equal(exists, true);
    });

    it('fails when root directory does not exist', async function () {
      const dest = path.join('node_modules', `${Date.now()}`, 'foo', 'bar');
      const success = await fs.ensureDirectory(dest).then(() => true).catch(() => false);
      assert.equal(success, false);
    });

    it('ignores existing directories', async function () {
      const dest = path.join('node_modules', `${Date.now()}`);
      const success0 = await fs.ensureDirectory(dest).then(() => true).catch(() => false);
      const success1 = await fs.ensureDirectory(dest).then(() => true).catch(() => false);
      assert.equal(success0, true);
      assert.equal(success0, success1);
    });

  });

  describe('ensureDirectoryDeeply()', function () {

    it('recursively creates directory', async function () {
      const dest = path.join('node_modules', `${Date.now()}`, 'foo', 'bar', 'bar');
      const status = await fs.ensureDirectoryDeeply(dest).then(() => true).catch(() => false);
      const exists = await fs.isDirectory(dest);
      assert.equal(status, true);
      assert.equal(exists, true);
    });

  });

  describe('getDirectories()', function () {

    it('returns a list of sub directories', async function () {
      const dest = path.join('.');
      const dirs = await fs.getDirectories(dest).then((dirs) => {
        return dirs.map((d) => d.split(/\/|\\/).reverse()[0])
          .filter((f) => f !== 'dist');
      });
      assert.deepEqual(dirs, ['node_modules', 'src']);
    });

  });

  describe('getDirectoriesDeeply()', function () {

    it('returns a deep list of directories', async function () {
      const dest = path.join('node_modules', 'chai', 'lib');
      const dirs = await fs.getDirectoriesDeeply(dest).then((dirs) => {
        return dirs.map((d) => d.split(/\/|\\/).reverse()[0]);
      });
      assert.deepEqual(dirs, ['chai', 'core', 'interface', 'utils']);
    });

  });

  describe('getFiles()', function () {

    it('returns a list of directory files', async function () {
      const dest = path.join('src');
      const dirs = await fs.getFiles(dest).then((dirs) => {
        return dirs.map((d) => d.split(/\/|\\/).reverse()[0])
          .filter((f) => f !== '.DS_Store');
      });
      assert.deepEqual(dirs, ['fs.ts', 'index.ts', 'web3.ts']);
    });

  });

  describe('getFilesDeeply()', function () {

    it('returns a deep list of directory files', async function () {
      const dest = path.join('src');
      const dirs = await fs.getFilesDeeply(dest).then((dirs) => {
        return dirs.map((d) => d.split(/\/|\\/).reverse()[0])
          .filter((f) => f !== '.DS_Store');
      });
      assert.deepEqual(dirs, ['fs.ts', 'index.ts', 'web3.ts', 'fs.test.ts', 'index.test.ts', 'web3.test.ts']);
    });

  });

  describe('readFile()', function () {

    it('returns file content', async function () {
      const dest = path.join('nodemon.json');
      const data = await fs.readFile(dest);
      assert.equal(data.byteLength, 45);
    });

  });

  describe('writeFile()', function () {

    it('wrates content to a file', async function () {
      const dest = path.join('node_modules/foo.json');
      await fs.writeFile(dest, 'foo');
      const data = await fs.readFile(dest);
      assert.equal(data.toString(), 'foo');
    });

  });

});
