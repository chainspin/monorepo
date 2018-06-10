import { assert } from 'chai';
import { Compiler } from '../compiler';
import * as utils from '@chainspin/utils';

describe('compiler', function () {

  before(async function () {
    this.compiler = new Compiler({
      src: './src/tests/assets',
      dist: './build',
    });
  });

  it('compiles solidity contracts', async function () {
    await this.compiler.compile();
    assert.equal(this.compiler.data.length, 7);
  });

  it('saves compiled data as JSON files with ABI/BIN', async function () {
    await this.compiler.save();
    const files = await utils.getFiles('./build');
    assert.equal(files.length, 7);
  });

});
