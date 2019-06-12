import fs from 'fs';
import genDiff from '../src';

const resultFlatJson = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
const resultFlatYaml = genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');
const resultFlatIni = genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini');
const expectedFlat = fs.readFileSync('__tests__/__fixtures__/diff-flat.txt', 'utf-8');

const tree = genDiff('__tests__/__fixtures__/before-tree.json', '__tests__/__fixtures__/after-tree.json');
const expectedTree = fs.readFileSync('__tests__/__fixtures__/diff-tree.txt', 'utf-8');

const plain = genDiff('__tests__/__fixtures__/before-tree.json', '__tests__/__fixtures__/after-tree.json', 'plain');
const expectedPlain = fs.readFileSync('__tests__/__fixtures__/diff-plain.txt', 'utf-8');

test.each([[resultFlatJson, expectedFlat],
  [resultFlatYaml, expectedFlat],
  [resultFlatIni, expectedFlat]])(
  'diff flat %#',
  (received, expected) => {
    expect(received).toBe(expected);
  },
);


test('diff tree', () => {
  expect(tree).toBe(expectedTree);
});

test('diff plain', () => {
  expect(plain).toBe(expectedPlain);
});
