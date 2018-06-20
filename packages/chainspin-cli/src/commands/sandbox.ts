import { Sandbox } from '@chainspin/sandbox';

/**
 * Starts Ethereum sandbox server.
 */
export default async function (n, s, options) {
  const { port, host } = options;

  const sandbox = new Sandbox();
  try {
    await sandbox.listen(port, host);
    console.log(`Listening at ${host}:${port} ...`);
  } catch (e) {
    console.error(e);
  }
}
