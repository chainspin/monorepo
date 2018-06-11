import * as program from 'commander';
import versionHandler from './commands/version';
import initHandler from './commands/init';
import sandboxHandler from './commands/sandbox';
import compileHandler from './commands/compile';
import testHandler from './commands/test';

/**
 * Injects TypeScript support so commands will be able to parse also TypeScript files.
 */
require('ts-node').register();

/**
 * Builds command-line interface.
 */
program
  .command('version')
  .description('Displays package version.')
  .action(versionHandler);
program
  .command('init')
  .description('Initializes project directory.')
  .action(initHandler);
program
  .command('sandbox')
  .description('Starts Ethereum sandbox server.')
  .action(sandboxHandler);
program
  .command('compile')
  .description('Compiles solidity contracts.')
  .action(compileHandler);
program
  .command('test')
  .description('Runs tests.')
  .action(testHandler);
program
  .command('')
program
  .parse(process.argv);
