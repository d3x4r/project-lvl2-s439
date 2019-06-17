import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathToFixtures = '__tests__/__fixtures__/';

const fixturesList = [['before.json', 'after.json', 'diff-flat.txt'],
  ['before.yml', 'after.yml', 'diff-flat.txt'],
  ['before.ini', 'after.ini', 'diff-flat.txt'],
  ['before-tree.json', 'after-tree.json', 'diff-tree.txt'],
  ['before-tree.json', 'after-tree.json', 'diff-plain.txt', 'plain'],
];

test.each(fixturesList)(
  'diff test %#',
  (fileNameOfDataBefore, fileNameOfDataAfter, fileNameOfExpectedData, formatType = 'tree') => {
    const pathToFileOfDataBefore = path.join(pathToFixtures, fileNameOfDataBefore);
    const pathToFileOfDataAfter = path.join(pathToFixtures, fileNameOfDataAfter);

    const resultDiff = genDiff(pathToFileOfDataBefore, pathToFileOfDataAfter, formatType);

    const pathToFileOfExpectedData = path.join(pathToFixtures, fileNameOfExpectedData);
    const expectedDiff = fs.readFileSync(pathToFileOfExpectedData, 'utf-8');
    expect(resultDiff).toBe(expectedDiff);
  },
);
