#!/usr/bin/env node
import commander from 'commander';

commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format');
commander.parse(process.argv);
