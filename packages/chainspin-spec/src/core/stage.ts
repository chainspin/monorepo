import * as core from "@hayspec/core";
import { DefaultReporter } from "@hayspec/reporter";
import Web3 from 'web3';

/**
 * 
 */
export class Stage<Data = {}> extends core.Stage<Data> {
  public web3: Web3;

  /**
   * 
   */
  public constructor (web3: Web3, reporter: DefaultReporter) {
    super(reporter);
    this.web3 = web3;
  }

  /**
   * 
   */
  public set<Key extends string, Value>(k: Key, v: Value) {
    (this.data as any)[k] = v;
  }

  /**
   * 
   */
  public get<Key extends keyof Data>(k: Key) {
    return this.data[k];
  }

}
