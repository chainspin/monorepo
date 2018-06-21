/**
 * File recipe interface.
 */
export interface FileRecipe {
  path: string[];
  content: string[];
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
      `build`,
    ],
  },
  {
    path: ['.npmignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`,
    ],
  },
  {
    path: ['package.json'],
    content: [
      `{`,
      `  "name": "{{ name }}",`,
      `  "version": "0.0.0",`,
      `  "description": "{{ description }}",`,
      `  "scripts": {`,
      `    "compile": "chainspin compile",`,
      `    "sandbox": "chainspin sandbox",`,
      `    "prepublishOnly": "chainspin compile",`,
      `    "test": "chainspin compile && chainspin test --require ts-node/register"`,
      `  },`,
      `  "license": "MIT",`,
      `  "dependencies": {`,
      `    "@chainspin/cli": "latest",`,
      `    "@chainspin/spec": "latest",`,
      `    "ts-node": "^6.1.1",`,
      `    "typescript": "^2.9.1",`,
      `    "web3": "git+https://github.com/0xcert/web3.js.git#newAbiLib"`,
      `  }`,
      `}`,
    ],
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
    ],
  },
  {
    path: ['src', 'tests', 'Main.test.ts'],
    content: [
      `import { Spec } from '@chainspin/spec';`,
      ``,
      `const spec = new Spec();`,
      ``,
      `spec.test('returns boolean', async (ctx) => {`,
      `  const main = await ctx.requireContract({ src: './build/Main.json' });`,
      `  const value = await main.methods.works().call();`,
      `  ctx.is(value, '100');`,
      `});`,
      ``,
      `export default spec;`, 
    ],
  },
  {
    path: ['tsconfig.json'],
    content: [
      `{`,
      `  "compilerOptions": {`,
      `    "module": "commonjs",`,
      `    "target": "es6"`,
      `  }`,
      `}`,
    ],
  },
] as FileRecipe[];
