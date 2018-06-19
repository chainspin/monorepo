import { Stage, Spec as SpecBase } from '@hayspec/core';
import { DefaultReporter } from '@hayspec/reporter';
import { Context } from './context';

/**
 * 
 */
export class Spec<Data = {}, Web3 = {}> extends SpecBase<Data> {
  protected web3_: Stage<Data> = this.createStage();

  /**
   * 
   */
  public get web3() {
    return this.parent ? this.parent.stage : this.stage_;
  }

  /**
   * 
   */
  protected createStage() {
    const reporter = new DefaultReporter();
    return new Stage<Data>(reporter);
  }

  /**
   * 
   */
  protected createContext() {
    return new Context<Data>(this.stage);
  }

}
