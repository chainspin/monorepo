import { Runner } from '@chainspin/test';
import * as utils from '../utils';

/**
 * Runs tests.
 */
export default async function () {
  const config = await utils.getConfig();
  const runner = new Runner({
    host: config.sandboxHost,
    port: config.sandboxPort,
    root: config.testRoot,
    timeout: config.testTimeout,
  });
  try {
    console.log('Running tests ...');
    await runner.run();
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
}
