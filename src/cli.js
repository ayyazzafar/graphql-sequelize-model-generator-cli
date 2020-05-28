import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--name': Boolean,

    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args['--name'],

  };
}

async function promptForMissingOptions(options) {


  const questions = [];
  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Please type your model name',
      default: 'Sample',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    name: options.name || answers.name,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}

// ...
