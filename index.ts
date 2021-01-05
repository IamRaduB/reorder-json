#!/usr/bin/env node

import yargs from 'yargs';
import ora from 'ora';
import chalk from 'chalk';
import { Reorder } from './src/reorder';
import { InvalidError, RequiredError } from './src/error';
import { UtilService } from './src/util.service';

async function init() {
  const reorder = new Reorder();
  const utilService = new UtilService();
  const spinner = ora('Reordering...');
  const { i, o } = yargs.argv;

  // clear the terminal
  process.stdout.write('\x1b[0f');
  console.clear();

  console.log(chalk.blue.bold('Reorder JSON'));

  if (!i) {
    const err = new RequiredError();
    spinner.fail(err.message);
    throw err;
  }

  if (!utilService.parsePath(i as string)) {
    const err = new InvalidError();
    spinner.fail(err.message);
    throw err;
  }

  spinner.start();

  try {
    await reorder.reorderJSON(i as string, o as string);
  } catch (e) {
    spinner.fail(`Error reordering json`);
    console.error(e);
    throw e;
  } finally {
    spinner.succeed('✔ Reordered!');
  }
}

init();
