const { Spec } = require('../../');

const spec = new Spec();

spec.test('provides assert', (ctx) => {
  ctx.true(true);
});

spec.test('provides artifact', async (ctx) => {
  const example = await ctx.deploy({ src: 'Example.json' });
  const value = await example.methods.test().call();
  ctx.is(value, 123457);
});

spec.test('provides web3', async (ctx) => {
  const accounts = await web3.eth.getAccounts();
  ctx.is(accounts[0].substr(0, 2), '0x');
});

module.exports = spec;
