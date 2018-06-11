import { assert } from 'chai';
import * as utils from '..';

describe('index', function () {

  it('exposes isDirectory method', async function () {
    assert.equal(!!utils.isDirectory, true);
  });

  it('exposes isFile method', async function () {
    assert.equal(!!utils.isFile, true);
  });

  it('exposes ensureDirectory method', async function () {
    assert.equal(!!utils.ensureDirectory, true);
  });

  it('exposes ensureDirectoryDeeply method', async function () {
    assert.equal(!!utils.ensureDirectoryDeeply, true);
  });

  it('exposes getDirectories method', async function () {
    assert.equal(!!utils.getDirectories, true);
  });

  it('exposes getDirectoriesDeeply method', async function () {
    assert.equal(!!utils.getDirectoriesDeeply, true);
  });

  it('exposes getFiles method', async function () {
    assert.equal(!!utils.getFiles, true);
  });

  it('exposes getFilesDeeply method', async function () {
    assert.equal(!!utils.getFilesDeeply, true);
  });

  it('exposes readFile method', async function () {
    assert.equal(!!utils.readFile, true);
  });

  it('exposes writeFile method', async function () {
    assert.equal(!!utils.writeFile, true);
  });

  it('exposes toTuple method', async function () {
    assert.equal(!!utils.toTuple, true);
  });

});
