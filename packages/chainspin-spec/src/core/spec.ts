import { Spec as SpecBase } from '@hayspec/core';
import { DefaultReporter } from '@hayspec/reporter';
import * as DefaultWeb3 from 'web3';
import { Stage } from './stage';
import { Context } from './context';

/**
 * 
 */
type ContextHandler<Data, Web3> = (context: Context<Data, Web3>, stage: Stage<Data, Web3>) => (void | Promise<void>);

/**
 * 
 */
export class Spec<Data = {}, Web3 = {}> extends SpecBase<Data> {
  public stage: Stage<Data, Web3>;

  /**
   * 
   */
  public constructor(stage?: Stage<Data, Web3>, parent?: Spec<Data>) {
    super(stage, parent);
  }

  /**
   * 
   */
  public test(message: string, handler: ContextHandler<Data, Web3>) {
    return super.test(message, handler);
  }

  /**
   * 
   */
  public skip(message: string, handler?: ContextHandler<Data, Web3>) {
    return super.skip(message, handler);
  }

  /**
   * 
   */
  public only(message: string, handler: ContextHandler<Data, Web3>) {
    return super.only(message, handler);
  }

  /**
   * 
   */
  protected createStage() {
    const web3 = new (DefaultWeb3 as any)('http://localhost:8545');
    const reporter = new DefaultReporter();
    return new Stage<Data, Web3>(web3, reporter);
  }

  /**
   * 
   */
  protected createContext() {
    return new Context<Data>(this.stage);
  }

}
