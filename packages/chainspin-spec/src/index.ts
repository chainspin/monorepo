export * from './core/runner';
export * from './core/spec';






// import * as Web3 from 'web3';
// import { Artifact } from './artifact';
// import { Runner } from './runner';
// import { getConfigSync } from './config';

// const config = getConfigSync();

// export const provider = new Web3.providers.HttpProvider(
//   `http://${config.sandboxHost}:${config.sandboxPort}`
// );

// export const web3 = new Web3(provider);
// export const artifact = new Artifact({
//   root: config.solcDist,
//   web3,
// });
// export const runner = new Runner({
//   host: config.sandboxHost,
//   port: config.sandboxPort,
//   root: config.testRoot,
//   timeout: config.testTimeout,
// });

// export { assert } from 'chai';
// export * from './artifact';
// export * from './runner';
