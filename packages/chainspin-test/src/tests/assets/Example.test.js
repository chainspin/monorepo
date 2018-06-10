const { assert, artifact, web3 } = require('../../');

describe('Example', function () {

  it('provides assert', async function () {
    assert.isTrue(true);
  });

  it('provides artifact', async function () {
    const example = await artifact.deploy({ src: 'Example.json' });
    const value = await example.methods.test().call();
    assert.equal(value, 123457);
  });

  it('provides web3', async function () {
    const accounts = await web3.eth.getAccounts();
    assert.equal(accounts[0].substr(0, 2), '0x');
  });

});
