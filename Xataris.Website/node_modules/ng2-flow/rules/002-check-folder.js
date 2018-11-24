'use strict';

const chalk = require('chalk');
const shelljs = require('shelljs');

module.exports.exec = (options) => {
  shelljs.echo(chalk.gray('Checking is folder %s exists'), options.folder);
};



