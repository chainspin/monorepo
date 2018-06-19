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
      `  "version": "0.0.0",`,
      `  "description": "{{ description }}",`,
      `  "scripts": {`,
      `    "clean": "chainspin clean",`,
      `    "compile": "chainspin compile",`,
      `    "sandbox": "chainspin sandbox",`,
      `    "prepublishOnly": "chainspin compile",`,
      `    "test": "chainspin compile && chainspin test"`,
      `  },`,
      `  "license": "MIT",`,
      `  "dependencies": {`,
      `    "@chainspin/cli": "latest",`,
      `    "@chainspin/spec": "latest",`,
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
      `    "target": "es6"`,
      `  }`,
      `}`,
    ].join('\n'),
  },
] as FileRecipe[];
