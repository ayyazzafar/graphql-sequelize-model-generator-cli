import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';
import { promisify } from 'util';
import path from 'path';

let fsPromises = require('fs').promises

const currentFileUrl = import.meta.url;
const templateDir = path.resolve(
  new URL(currentFileUrl).pathname,
  '../../templates');

async function createMigration(options) {

  new Promise(async (resolve, reject) => {

    await fs.promises.mkdir('migrations', { recursive: true });



    let data = await fsPromises.readFile(templateDir+'/migration.js', "utf8");

    data = data.split("${TABLE_NAME}").join(options.name.toLowerCase() + 's');

    fs.writeFile(`migrations/${Math.round(new Date().getTime() / 1000)}_create_${options.name}_table.js`, data, function (err) {
      if (err) { reject(err); throw err; }

      resolve();
    });
  })

}


async function createModel(options) {

  new Promise(async (resolve, reject) => {

    await fs.promises.mkdir('src/Shared/sequelize/models/', { recursive: true });




    let data = await fsPromises.readFile(templateDir+'/model.txt', "utf8");

    data = data.split("${TABLE_NAME}").join(options.name.toLowerCase() + 's');
    data = data.split("${MODEL_NAME}").join(capitalizeFirstLetter(options.name));

    fs.writeFile(`src/Shared/sequelize/models/${capitalizeFirstLetter(options.name)}.ts`, data, function (err) {
      if (err) { reject(err); throw err; }

      resolve();
    });
  })

}


async function createService(options) {

  new Promise(async (resolve, reject) => {

    await fs.promises.mkdir('src/shared/services', { recursive: true });
    let data = await fsPromises.readFile(templateDir+'/service.txt', "utf8");

    data = data.split("${MODEL_NAME}").join(options.name);
    data = data.split("${MODEL_NAME_LOWERCASE}").join(options.name.toLowerCase());

    fs.writeFile(`src/Shared/services/${capitalizeFirstLetter(options.name)}.service.ts`, data, function (err) {
      if (err) { reject(err); throw err; }

      resolve();
    });
  })

}


async function createGrphqlStructure(options) {
  await fs.promises.mkdir('src/Public/graphql/' + options.name, { recursive: true });

  ncp(templateDir+'/graphql', 'src/Public/graphql/' + options.name, async function (err) {
    if (err) {
      return console.error(err);
    }
    await  replaceFileContent('src/Public/graphql/' + options.name+'/typeDef.ts', options.name);
    await  replaceFileContent('src/Public/graphql/' + options.name+'/index.ts', options.name);
    await  replaceFileContent('src/Public/graphql/' + options.name+'/resolvers/query/index.ts', options.name);
    await  replaceFileContent('src/Public/graphql/' + options.name+'/resolvers/query/sample-query.resolver.ts', options.name);

    await  replaceFileContent('src/Public/graphql/' + options.name+'/resolvers/subscription/sample.subscription.resolver.ts', options.name);
    await  replaceFileContent('src/Public/graphql/' + options.name+'/resolvers/subscription/index.ts', options.name);

  });
}



export async function createProject(options) {


  // try {
  //   await access(templateDir, fs.constants.R_OK);
  // } catch (err) {
  //   console.error('%s Invalid template name', chalk.red.bold('ERROR'));
  //   process.exit(1);
  // }

  const tasks = new Listr(
    [
      {
        title: 'Creating Migration File',
        task: () => createMigration(options),
      },
      {
        title: 'Creating Model file',
        task: () => createModel(options),
      },
      {
        title: 'Creating Service',
        task: () => createService(options),
      },
      {
        title: 'Creating Graphql Structure',
        task: () => createGrphqlStructure(options),
      }
    ],
    {
      exitOnError: false,
    }
  );

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function replaceFileContent(file, modelName){

  return new Promise((resolve, reject)=>{

  var fs = require('fs')
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      reject(err);
      return console.log(err);
    }
     data  = data.split("${LOWERCASE_MODEL_NAME}").join(modelName.toLowerCase());
     data  = data.split("${MODEL_NAME}").join(modelName);

    fs.writeFile(file, data, 'utf8', function (err) {
      if (err) {
        reject(err);
        return console.log(err);
      }
      resolve();
    });
  });
  })
}