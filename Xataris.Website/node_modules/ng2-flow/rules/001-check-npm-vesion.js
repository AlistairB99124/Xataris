'use strict';
const npm = require('npm');
const chalk = require('chalk');
const semver = require('semver');
const shelljs = require('shelljs');

const pkg = require('../package.json');

const isNpmVersionValid = semver.satisfies(npm.version, pkg.engines.npm);

module.exports.run = () => {
  if (!isNpmVersionValid) {
    shelljs.echo(chalk.bold.red('Error:'), chalk.red('invalid npm version'), chalk.bold.red(npm.version));
    shelljs.echo(chalk.bold.green('Should be:'), chalk.green(pkg.engines.npm));
    shelljs.echo(chalk.green('$[sudo] npm i -g npm@latest'));
    shelljs.exit(1);
  }
};
