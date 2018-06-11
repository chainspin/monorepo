import { Compiler } from '@chainspin/compiler';
import * as utils from '../utils';

/**
 * Compiles solidity contracts.
 */
export default async function () {
  const config = await utils.getConfig();
  const compiler = new Compiler({
    src: config.solcSrc,
    dist: config.solcDist,
  });
  try {
    console.log('Compiling contracts ...',);
    await compiler.compile();
    await compiler.save();
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
}