/**
 * File recipe interface.
 */
export interface FileRecipe {
  path: string[];
  content: string;
}

/**
 * Project files.
 */
export const files = [
  {
    path: ['.gitignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`,
      `dist`,
    ].join('\n'),
  },
  {
    path: ['.npmignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`,
    ].join('\n'),
  },
  {
    path: ['package.json'],
    content: [
      `{`,
      `  "name": "{{ name }}",`,
      `  "version": "0.1.0",`,
      `  "description": "{{ description }}",`,
      `  "main": "./dist/index.js",`,
      `  "types": "./dist/index.d.ts",`,
      `  "scripts": {`,
      `    "clean": "rm -Rf ./dist; rm -Rf ./build",`,
      `    "build": "npm run clean; tsc",`,
      `    "compile": "chainspin compile",`,
      `    "sandbox": "chainspin sandbox",`,
      `    "prepare": "npm run build && npm run compile",`,
      `    "test": "npm run prepare && chainspin test"`,
      `  },`,
      `  "chainspin": {`,
      `    "sandboxHost": "127.0.0.1",`,
      `    "sandboxPort": 8545,`,
      `    "solcSrc": "src/contracts",`,
      `    "solcDist": "dist/contracts",`,
      `    "testRoot": "dist/tests",`,
      `    "testTimeout": 60000`,
      `  },`,
      `  "license": "MIT",`,
      `  "dependencies": {`,
      `    "@chainspin/cli": "^0.1.0-alpha21",`,
      `    "typescript": "^2.9.1"`,
      `  }`,
      `}`,
    ].join('\n'),
  },
  {
    path: ['src', 'contracts', 'Main.sol'],
    content: [
      `pragma solidity ^0.4.24;`,
      ``,
      `contract Main {`,
      ``,
      `  function works()`,
      `    public`,
      `    pure`,
      `    returns (uint256 _value)`,
      `  {`,
      `    _value = 100;`,
      `  }`,
      ``,
      `}`,
    ].join('\n'),
  },
  {
    path: ['src', 'tests', 'Main.test.ts'],
    content: [
      `import { assert, artifact } from '@chainspin/test';`,
      ``,
      `describe('Main', function () {`,
      ``,
      `  describe('works()', function () {`,
      ``,
      `    it('returns boolean', async function () {`,
      `      const main = await artifact.deploy({ src: 'Main.json' });`,
      `      const value = await main.methods.works().call();`,
      `      assert.equal(value, 100);`,
      `    });`,
      ``,
      `  });`,
      ``,
      `});`, 
    ].join('\n'),
  },
  {
    path: ['tsconfig.json'],
    content: [
      `{`,
      `  "compilerOptions": {`,
      `    "module": "commonjs",`,
      `    "target": "es6",`,
      `    "noImplicitAny": false,`,
      `    "removeComments": true,`,
      `    "sourceMap": true,`,
      `    "outDir": "dist/tests",`,
      `    "declaration": true`,
      `  }`,
      `}`,
    ].join('\n'),
  },
] as FileRecipe[];
