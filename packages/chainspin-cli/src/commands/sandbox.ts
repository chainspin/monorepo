import { Sandbox } from '@chainspin/sandbox';
import * as utils from '../utils';

/**
 * Starts Ethereum sandbox server.
 */
export default async function () {
  const config = await utils.getConfig();
  const sandbox = new Sandbox({
    host: config.sandboxHost,
    port: config.sandboxPort,
  });
  try {
    await sandbox.listen();
    console.log(`Sendbox listening (${config.sandboxHost}:${config.sandboxPort}) ...`);
  } catch (e) {
    console.error(e);
  }
}
