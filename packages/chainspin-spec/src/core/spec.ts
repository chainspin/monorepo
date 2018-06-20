import * as Web3 from 'web3';
import { Spec as SpecBase } from '@hayspec/core';
import { DefaultReporter } from '@hayspec/reporter';
import { Stage } from './stage';
import { Context } from './context';

/**
 * 
 */
type ContextHandler<Data> = (context: Context<Data>, stage: Stage<Data>) => (void | Promise<void>);

/**
 * 
 */
export class Spec<Data = {}> extends SpecBase<Data> {
  public stage: Stage<Data>;

  /**
   * 
   */
  public constructor(stage?: Stage<Data>, parent?: Spec<Data>) {
    super(stage, parent);
  }

  /**
   * 
   */
  public test(message: string, handler: ContextHandler<Data>) {
    return super.test(message, handler);
  }

  /**
   * 
   */
  public skip(message: string, handler?: ContextHandler<Data>) {
    return super.skip(message, handler);
  }

  /**
   * 
   */
  public only(message: string, handler: ContextHandler<Data>) {
    return super.only(message, handler);
  }

  /**
   * 
   */
  protected createStage() {
    const web3 = new (Web3 as any)('http://localhost:8545') as Web3.default; // typescript definition fix
    const reporter = new DefaultReporter();
    return new Stage<Data>(web3, reporter);
  }

  /**
   * 
   */
  protected createContext() {
    return new Context<Data>(this.stage);
  }

}
