import * as args from 'args';
// import versionHandler from './commands/version';
import initHandler from './commands/init';
import sandboxHandler from './commands/sandbox';
import compileHandler from './commands/compile';
import testHandler from './commands/test';

/**
 * Command parsing.
 */
const flags = args.parse(process.argv);

/**
 * Upgrading environment.
 */
if (typeof flags.require === 'string') {
  flags.require.split(',').forEach((v) => require(v));
}

/**
 * Interface definition.
 */
args
  .option('require', 'Display program version.')
args
  .command('compile', 'Compiles solidity contracts.', compileHandler);
args
  .command('init', 'Initializes project directory.', initHandler);
args
  .option('port', 'Server port number.', 8545)
  .option('host', 'Server hostname.', 'localhost')
  .command('sandbox', 'Starts Ethereum sandbox server.', sandboxHandler);
args
  .option('match', 'Test files match pattern.', './src/tests/**/*.test.*')
  .command('test', 'Runs tests.', testHandler);
