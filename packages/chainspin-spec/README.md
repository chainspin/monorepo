```ts
import { Spec, Contract } from '@chainspin/core';

interface Data {
  id?: number;
  name?: string;
  User?: Contract;
}

const spec = new Spec<Data>();

spec.before(async (ctx) => {
  ctx.set('id', 100);
  ctx.set('accounts', await context.getAccounts());
  ctx.set('User', await context.getContract({ str: './src/contracts/User' }));
});

spec.test('has cars', (ctx) => {
  const User = ctx.get('User');
});

spec.skip('has trucks', (ctx) => {});

export default spec;
```
