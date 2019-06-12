#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'Output format', 'tree')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  });
commander.parse(process.argv);
