import * as ganache from 'ganache-cli';

/**
 * Sandbox server configuration recipe.
 */
export interface SandboxRecipe {
  host?: string;
  port?: number;
}

/**
 * Sandbox server for testing Ethereum code.
 */
export class Sandbox {
  protected server: any;
  protected recipe: SandboxRecipe;

  /**
   * Class constructor.
   * @param recipe Sandbox server configuration recipe.
   */
  constructor (recipe?: SandboxRecipe) {
    this.recipe = {
      host: 'localhost',
      port: 8545,
      ...recipe,
    };
  }

  /**
   * Starts the server.
   */
  public async listen () {
    await new Promise((resolve, reject) => {
      this.server = ganache.server();
      this.server.listen(this.recipe.port, this.recipe.host, (e) => e ? reject(e) : resolve());
    });
  }

  /**
   * Stops the server.
   */
  public async close () {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }

}
