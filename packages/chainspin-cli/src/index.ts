import * as program from 'commander';
import * as inquirer from 'inquirer';
import { Generator } from '@chainspin/init';
import { Sandbox } from '@chainspin/sandbox';
import { Compiler } from '@chainspin/compiler';
import { Runner } from '@chainspin/test';
import * as utils from './utils';

program
  .command('version')
  .description('Displays package version.')
  .action(async function () {
    const version = await utils.getVersion();
    console.log(version);
  });

program
  .command('init')
  .description('Initializes project directory.')
  .action(async function () {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Project name:"
      },
      {
        type: 'input',
        name: 'description',
        message: "Project description:"
      }
    ]);
    const generator = new Generator({
      root: process.cwd(),
      name: (answers['name'] || process.cwd().split(/\\|\//).reverse()[0]).toLowerCase(),
      description: answers['description'],
    });
    try {
      console.log(`Initializing ...`);
      await generator.build();
      console.log(`Done`);
    } catch (e) {
      console.error(e);
    }
  });

program
  .command('sandbox')
  .description('Starts Ethereum sandbox server.')
  .action(async function () {
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
  });

program
  .command('compile')
  .description('Compiles solidity contracts.')
  .action(async function () {
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
  });

program
  .command('test')
  .description('Runs tests.')
  .action(async function () {
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
  });

program.command('');
program.parse(process.argv);
