import { assert } from 'chai';
import * as web3 from '../web3';

describe('web3', function () {

  describe('toTuple()', function () {

    it('transforms an object to tulip type', async function () {
      const tuple = await web3.toTuple({
        foo: "FOO",
        bar: ["BAR1", "BAR2"],
        baz: {
          bazfoo: [1, 2],
          bazbar: 'BAZBAR',
        },
        zed: [
          {
            zedfoo: [1, 2],
            zedbar: 'BAZBAR',
          }
        ]
      });
      assert.deepEqual(tuple, [
        "FOO",
        ["BAR1", "BAR2"],
        [[1, 2], 'BAZBAR'],
        [[[1, 2], 'BAZBAR']],
      ]);
    });

  });

});
