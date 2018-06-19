import test from 'ava';
import * as request from 'supertest';
import { Sandbox } from '../sandbox';

const sandbox = new Sandbox({ port: 8911 });

test.before(async () => {
  await sandbox.listen();  
})
test.after(async () => {
  sandbox.close();
});

test('listens for requests', async (t) => {
  const res = await request('http://localhost:8911')
    .get('/')
    .catch((e) => e.response);
  t.is(res.status, 400);
});
