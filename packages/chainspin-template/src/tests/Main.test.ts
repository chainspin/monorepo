import { assert, artifact } from '@chainspin/test';

describe('Main', function () {

  describe('works()', function () {

    it('returns `true`', async function () {
      const main = await artifact.deploy({ src: 'Main.json' });
      const value = await main.methods.works().call();
      assert.equal(value, true);
    });

  });

});
