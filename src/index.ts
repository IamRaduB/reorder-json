import yargs from 'yargs';
import ora from 'ora';
import chalk from 'chalk';
import { InvalidError, RequiredError } from './error';
import { UtilService } from './util.service';
import { Reorder } from './reorder';

export { Reorder } from './reorder';

export async function initCli() {
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
    return;
  }

  if (!utilService.parsePath(i as string)) {
    const err = new InvalidError();
    spinner.fail(err.message);
    return;
  }

  spinner.start();

  try {
    await reorder.reorderJSON(i as string, o as string);
  } catch (e) {
    spinner.fail(`Error reordering json`);
    console.error(e);
    return;
  } finally {
    spinner.succeed('✔ Reordered!');
  }
}
