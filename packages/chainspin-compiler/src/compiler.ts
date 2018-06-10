import * as path from 'path';
import * as utils from '@chainspin/utils';
import * as solc from 'solc';

/**
 * Contract data.
 */
export interface ContractData {
  abi: string;
  bin: string;
  name: string;
}

/**
 * Compiler configuration recipe.
 */
export interface CompilerRecipe {
  src: string;
  dist: string;
  filter?: (f: string) => boolean;
}

/**
 * Solidity files compiler.
 */
export class Compiler {
  protected recipe: CompilerRecipe;
  public data: ContractData[];

  /**
   * Class constructor.
   * @param recipe Compiler configuration recipe.
   */
  public constructor (recipe: CompilerRecipe) {
    this.recipe = {
      filter: (f) => f.substr(-4) === '.sol',
      ...recipe,
    };
    this.data = [];
  }

  /**
   * Creates the destnation folder and compiles solidity files these as JSON files with ABI and
   * BIN data.
   */
  public async compile () {
    this.data = [];
    await utils.ensureDirectoryDeeply(this.recipe.dist);
    await this.buildContracts();
  }

  /**
   * Saves compiled data into JSON files.
   */
  public async save () {
    await Promise.all(
      this.data.map((d) => {
        return utils.writeFile(
          path.join(this.recipe.dist, `${d.name}.json`),
          JSON.stringify(d, null, 2)
        );
      })
    );
  }

  /**
   * Compiles solidity files info JSON files with ABI and BIN data.
   */
  protected async buildContracts () {
    const sources = await this.getSolcSources();

    const output = solc.compile({ sources }, 1);
    if (output.errors) {
      throw new Error(output.errors);
    }
    
    for (const name in output.contracts) {
      const contract = output.contracts[name];
      this.data.push({
        abi: JSON.parse(contract.interface),
        bin: contract.bytecode,
        name: name.split(':')[1],
      });
    }
  }

  /**
   * Returns solidity import sources for solc compiler.
   */
  protected async getSolcSources () {
    const dirs = [
      ...await this.getModuleDirectories('node_modules'),
      this.recipe.src,
    ];

    const files = await Promise.all(
      dirs.map((p) => utils.getFilesDeeply(p))
    ).then((f) => {
      return f.reduce((a, b) => a.concat(b), []);
    }).then((f) => {
      return f.filter(this.recipe.filter);
    });

    const sources = {};
    for (const file of files) {
      const key = this.normalizeSolcPath(file);
      sources[key] = await utils.readFile(file).then((s) => s.toString());
    }
    return sources;
  }

  /**
   * Converts the solidity file path to solc compiler compatible source path (key name).
   * @param dest Path to a file.
   */
  protected normalizeSolcPath (dest) {
    return dest.indexOf('node_modules') === 0 ? dest.substr(13) : `./${dest}`;
  }

  /**
   * Returns a list of absolute paths of the available node modules.
   * @param dest Path to a modules directory.
   */
  protected async getModuleDirectories (dest) {
    const paths = [];
    const dirs = await utils.getDirectories(dest);

    for (const dir of dirs) {
      if (dir[13] === '@' && dir.split(/\\|\//).length === 2) {
        paths.push(
          ...await this.getModuleDirectories(dir)
        );
      } else {
        await Promise.all(
          [ path.join(dir, 'contracts'),
            path.join(dir, 'src', 'contracts'),
          ].map((d) => {
            return utils.isDirectory(d).then((b) => b ? d : null)
          })
        ).then((results) => {
          results.forEach((r) => r ? paths.push(r) : null)
        });
      }
    }
    return paths;
  }

}