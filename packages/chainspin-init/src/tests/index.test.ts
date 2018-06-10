import { assert } from 'chai';
import * as init from '..';

describe('index', function () {

  it('exposes Generator class', async function () {
    assert.equal(!!init.Generator, true);
  });

});
