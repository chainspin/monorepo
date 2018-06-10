import * as utils from '@chainspin/utils';
import * as path from 'path';
import * as structure from './structure';

/**
 * Initializer config recipe.
 */
export interface GeneratorRecipe {
  root: string;
  name: string;
  description: string;
}

/**
 * Project structure initializer.
 */
export class Generator {
  protected recipe: GeneratorRecipe;

  /**
   * Class constructor.
   * @param recipe Initializer config recipe.
   */
  public constructor (recipe: GeneratorRecipe) {
    this.recipe = recipe;
  }

  /**
   * Creates project files.
   */
  public async build () {
    for (const file of structure.files) {
      const dest = path.resolve(this.recipe.root, ...file.path);
      
      const dir = path.dirname(dest);
      await utils.ensureDirectoryDeeply(dir);

      const src = file.content
        .replace('{{ name }}', this.recipe.name)
        .replace('{{ description }}', this.recipe.description);
      await utils.writeFile(dest, src);
    }
  }

}