'use strict';

const chalk = require('chalk');
const shelljs = require('shelljs');
const semver = require('semver');

const pkg = require('../package.json');
const nodeVersion = process.versions.node;

const isNodeVersionValid = semver.satisfies(nodeVersion, pkg.engines.node);

module.exports.run = ()=>{
  if (!isNodeVersionValid) {
    shelljs.echo(chalk.bold.red('Error:'), chalk.red('invalid node version'), chalk.bold.red(nodeVersion));
    shelljs.echo(chalk.bold.green('Should be:'), chalk.green(pkg.engines.node));
    shelljs.echo(chalk.green('Please install latest from: '), chalk.white('https://nodejs.org/en/'));
    shelljs.exit(1);
  }
};
