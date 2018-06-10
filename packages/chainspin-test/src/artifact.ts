import * as path from 'path';
import * as utils from '@chainspin/utils';
import { Web3 } from '@chainspin/web3';

/**
 * Artifact configuration recipe.
 */
export interface ArtifactRecipe {
  root: string;
  web3: Web3;
}

/**
 * Solidity contract artifact.
 */
export interface ArtifactDeployment {
  src: string;
  args?: any[];
  from?: string;
  gas?: number;
  gasPrice?: number;
}

/**
 * Solidity contract artifact.
 */
export class Artifact {
  public recipe: ArtifactRecipe;

  /**
   * Class constructor.
   * @param recipe Artifact configuration recipe.
   */
  public constructor (recipe: ArtifactRecipe) {
    this.recipe = recipe;
  }

  /**
   * Deploys solidity contract and returns a new instance of a contract.
   * @param options 
   */
  public async deploy (options: ArtifactDeployment) {
    const config = {
      args: [],
      from: await this.recipe.web3.eth.getAccounts().then((a) => a[0]),
      gas: 3000000,
      gasPrice: 5000000000,
      ...options,
    } as ArtifactDeployment;

    const dest = path.resolve(this.recipe.root, config.src);
    const data = await utils.readFile(dest);
    const json = JSON.parse(data.toString());
    const contract = new this.recipe.web3.eth.Contract(json.abi);
    const deploy = await contract.deploy({
      data: json.bin,
      arguments: config.args,
    }).send({
      from: config.from,
      gas: config.gas,
      gasPrice: config.gasPrice,
    });

    return new this.recipe.web3.eth.Contract(
      json.abi,
      deploy.options.address
    );
  }

}
