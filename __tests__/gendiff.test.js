import fs from 'fs';
import genDiff from '../src';

const pathToFlatDataJsonBefore = '__tests__/__fixtures__/before.json';
const pathToFlatDataJsonAfter = '__tests__/__fixtures__/after.json';

const pathToFlatDataYamlBefore = '__tests__/__fixtures__/before.yml';
const pathToFlatDataYamlAfter = '__tests__/__fixtures__/after.yml';

const pathToFlatDataIniBefore = '__tests__/__fixtures__/before.ini';
const pathToFlatDataIniAfter = '__tests__/__fixtures__/after.ini';

const pathToTreeDataJsonBefore = '__tests__/__fixtures__/before-tree.json';
const pathToTreeDataJsonAfter = '__tests__/__fixtures__/after-tree.json';

test.each([[genDiff(pathToFlatDataJsonBefore, pathToFlatDataJsonAfter), fs.readFileSync('__tests__/__fixtures__/diff-flat.txt', 'utf-8')],
  [genDiff(pathToFlatDataYamlBefore, pathToFlatDataYamlAfter), fs.readFileSync('__tests__/__fixtures__/diff-flat.txt', 'utf-8')],
  [genDiff(pathToFlatDataIniBefore, pathToFlatDataIniAfter), fs.readFileSync('__tests__/__fixtures__/diff-flat.txt', 'utf-8')]])(
  'diff flat %#',
  (received, expected) => {
    expect(received).toBe(expected);
  },
);

test('diff tree', () => {
  expect(genDiff(pathToTreeDataJsonBefore, pathToTreeDataJsonAfter)).toBe(fs.readFileSync('__tests__/__fixtures__/diff-tree.txt', 'utf-8'));
});

test('diff plain', () => {
  expect(genDiff(pathToTreeDataJsonBefore, pathToTreeDataJsonAfter, 'plain')).toBe(fs.readFileSync('__tests__/__fixtures__/diff-plain.txt', 'utf-8'));
});
