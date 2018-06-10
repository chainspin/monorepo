import { assert } from 'chai';
import * as request from 'supertest';
import { Sandbox } from '../sandbox';

describe('sandbox', function () {

  before(async function () {
    this.sandbox = new Sandbox({
      port: 8911,
    });
    await this.sandbox.listen();
  });

  after(async function () {
    this.sandbox.close();
  });

  it('listens for requests', async function () {
    const res = await request('http://localhost:8911')
      .get('/')
      .catch((e) => e.response);

    assert.equal(res.status, 400);
  });

});
