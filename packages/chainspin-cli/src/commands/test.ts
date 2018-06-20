import { Runner, Spec, Stage, Reporter } from '@chainspin/spec';
import * as Web3 from 'web3';

/**
 * Runs tests.
 */
export default async function (name: string, sub: string[], options) {
  const web3 = new (Web3 as any)('http://localhost:8545') as Web3.default; // typescript definition fix
  const reporter = new Reporter();
  const stage = new Stage(web3, reporter);
  const test = new Spec(stage);

  const runner = new Runner();
  await runner.require(...options.match.split(','));
  runner.results.forEach((result) => {
    const message = result.file.substr(process.cwd().length + 1);
    test.spec(message, result.spec);
  });

  await test.perform();
}
