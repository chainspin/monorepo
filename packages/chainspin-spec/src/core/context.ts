import * as path from 'path';
import { Context as ContextBase } from '@hayspec/core';
import { Stage } from './stage';
import Web3 from 'web3';

/**
 * 
 */
export class Context<Data = {}> extends ContextBase<Data> {
  public stage: Stage<Data>;

  /**
   * 
   */
  public constructor(stage: Stage<Data>) {
    super(stage);
  }

  /**
   * 
   */
  public get web3(): Web3 {
    return this.stage.web3;
  }

  /**
   * 
   */
  public async getAccounts() {
    return this.web3.eth.getAccounts();
  }

  /**
   * 
   */
  public async requireContract(options: {
      src: string;
      args?: any[];
      from?: string;
      gas?: number;
      gasPrice?: number;
  }) {
    const config = {
      args: [],
      from: await this.getAccounts().then((a) => a[0]),
      gas: 3000000,
      gasPrice: 5000000000,
      ...options,
    };
    const src = path.resolve(process.cwd(), options.src);
    const data = require(src);
    const contract = new this.web3.eth.Contract(data.abi);
    const deploy = await contract.deploy({
      data: data.bytecode,
      arguments: config.args,
    }).send({
      from: config.from,
      gas: config.gas,
      gasPrice: config.gasPrice,
    });
    return new this.web3.eth.Contract(
      data.abi,
      deploy.options.address
    );
  }

}
