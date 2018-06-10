import { assert } from 'chai';
import * as compiler from '..';

describe('index', function () {

  it('exposes Compiler class', async function () {
    assert.equal(!!compiler.Compiler, true);
  });

});
