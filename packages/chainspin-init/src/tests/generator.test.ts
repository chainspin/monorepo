import * as path from 'path';
import * as utils from '@chainspin/utils';
import { assert } from 'chai';
import { Generator } from '..';

describe('generator', function () {

  it('builds project structure', async function () {
    const root = path.join('node_modules', `.test${Date.now()}`);
    const generator = new Generator({
      root: root,
      name: '18sb3h301',
      description: '8f3nh19831',
    });
    await generator.build();
    const pkg = path.join(root, 'package.json');
    const src = await utils.readFile(pkg);
    assert.equal(src.indexOf('"18sb3h301"') !== 0, true); // replaced variable
    assert.equal(src.indexOf('"8f3nh19831"') !== 0, true); // replaced variable
  });

});
