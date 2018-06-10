import { assert } from 'chai';
import * as test from '..';

describe('index', function () {

  it('exposes Artifact class', async function () {
    assert.equal(!!test.Artifact, true);
  });

  it('exposes Runner class', async function () {
    assert.equal(!!test.Runner, true);
  });

  it('exposes web3 instance', async function () {
    assert.equal(typeof test.web3 === 'object', true);
  });

  it('exposes artifact instance', async function () {
    assert.equal(test.artifact instanceof test.Artifact, true);
  });

  it('exposes runner instance', async function () {
    assert.equal(test.runner instanceof test.Runner, true);
  });

  it('exposes assert method', async function () {
    assert.equal(!!test.assert, true);
  });

});
