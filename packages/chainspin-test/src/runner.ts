import * as Mocha from 'mocha';
import * as utils from '@chainspin/utils';
import { Sandbox } from '@chainspin/sandbox';

/**
 * Runner configuration recipe.
 */
export interface RunnerRecipe {
  root: string;
  host?: string;
  port?: number;
  timeout?: number;
  quiet?: boolean;
  filter?: ((f: string) => boolean); 
}

/**
 * Mocha based solidity contract tests.
 */
export class Runner {
  protected mocha: Mocha;
  protected recipe: RunnerRecipe;
  protected sandbox: Sandbox;

  /**
   * Class constructor.
   * @param recipe Test configuration recipe.
   */
  public constructor (recipe?: RunnerRecipe) {
    this.recipe = {
      host: 'localhost',
      port: 8545,
      timeout: 120000,
      quiet: false,
      filter: (f) => f.substr(-8) === '.test.js',
      ...recipe,
    };
    
    this.sandbox = new Sandbox({
      host: recipe.host,
      port: recipe.port,
    });

    this.mocha = new Mocha({
      timeout: this.recipe.timeout,
      reporter: recipe.quiet ? function () {} : 'list' as any,
    });
  }

  /**
   * Runs mocha tests.
   */
  public async run () {
    await this.sandbox.listen();

    await utils.getFilesDeeply(this.recipe.root).then((files) => {
      return files.filter(this.recipe.filter);
    }).then((files) => {
      return files.forEach((f) => this.mocha.addFile(f));
    });
    
    await new Promise((resolve, reject) => {
      this.mocha.run((e) => e ? reject(e) : resolve());
    });

    await this.sandbox.close();
  }
  
}
