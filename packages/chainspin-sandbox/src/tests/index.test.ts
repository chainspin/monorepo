import { assert } from 'chai';
import * as sandbox from '..';

describe('index', function () {

  it('exposes Sandbox class', async function () {
    assert.equal(!!sandbox.Sandbox, true);
  });

});
