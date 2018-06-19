import { Context as ContextBase } from '@hayspec/core';

/**
 * 
 */
export class Context<Data = {}> extends ContextBase<Data> {

  /**
   * 
   */
  public deploy() {
    console.log('Let us deploy something!');
    // return this.recipe.web3.eth.getAccounts();
  }

}
