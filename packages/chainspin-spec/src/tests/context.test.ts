import test from 'ava';
import { Sandbox } from '@chainspin/sandbox';
import * as Web3 from 'web3';
import { Context, Stage, Reporter } from '..';

const web3 = new (Web3 as any)('http://localhost:8545') as Web3.default;
const reporter = new Reporter();
const sandbox = new Sandbox();

test.before(async () => {
  sandbox.listen(8545);
});

test.after(async () => {
  sandbox.close();
});

test('method `requireContract` deploys the contract', async (t) => {
  const stage = new Stage(web3, reporter);
  const ctx = new Context(stage);
  const contact = await ctx.requireContract({ src: './src/tests/assets/Example.json' });
  const res = await contact.methods.test().call();
  t.is(res, '123457');
});
