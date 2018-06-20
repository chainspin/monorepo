import { Compiler } from '@chainspin/compiler';

/**
 * Compiles solidity contracts.
 */
export default async function () {
  const compiler = new Compiler();
  try {
    console.log('Compiling contracts ...',);
    compiler.require('./src/contracts/*.sol', './src/contracts/**/*.sol');
    compiler.save('./build');
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
}
