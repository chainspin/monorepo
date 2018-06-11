import * as inquirer from 'inquirer';
import { Generator } from '@chainspin/init';

/**
 * Input questions sequence.
 */
const questions = [
  {
    type: 'input',
    name: 'name',
    message: "Project name:"
  },
  {
    type: 'input',
    name: 'description',
    message: "Project description:"
  }
];

/**
 * Initializes project directory.
 */
export default async function () {
  const answers = await inquirer.prompt(questions);
  const generator = new Generator({
    root: process.cwd(),
    name: (answers['name'] || process.cwd().split(/\\|\//).reverse()[0]).toLowerCase(),
    description: answers['description'],
  });
  try {
    console.log(`Initializing ...`);
    await generator.build();
    console.log(`Done`);
  } catch (e) {
    console.error(e);
  }
}
