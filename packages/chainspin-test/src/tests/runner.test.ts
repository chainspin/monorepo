import * as fs from 'fs';
import * as path from 'path';
import { assert } from 'chai';
import { Runner } from '..';

const { chainspin } = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json')).toString()
);

describe('runner', function () {

  it('performs tests', async function () {
    try {
      await new Runner({
        host: chainspin.sandboxHost,
        port: chainspin.sandboxPort,
        root: chainspin.testRoot,
        timeout: chainspin.testTimeout,
        quiet: true,
      }).run();
    } catch (e) {
      assert.fail();
    }
  });

});
