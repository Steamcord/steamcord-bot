import chalk from 'chalk';

export function logError(message: string) {
  console.error(`${chalk.red('ERROR')} ${message}`);
}

export function logInfo(message: string) {
  console.info(`${chalk.blue('INFO')} ${message}`);
}
