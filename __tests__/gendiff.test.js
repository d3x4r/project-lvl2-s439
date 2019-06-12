import fs from 'fs';
import genDiff from '../src';

const json = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
const yaml = genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');
const ini = genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini');
const result = fs.readFileSync('__tests__/__fixtures__/diff-flat.txt', 'utf-8');

const tree = genDiff('__tests__/__fixtures__/before-tree.json', '__tests__/__fixtures__/after-tree.json');
const resultTree = fs.readFileSync('__tests__/__fixtures__/diff-tree.txt', 'utf-8');

const plainTree = genDiff('__tests__/__fixtures__/before-tree.json', '__tests__/__fixtures__/after-tree.json', 'plain');
const resultPlain = fs.readFileSync('__tests__/__fixtures__/diff-plain.txt', 'utf-8');

test.each([[json, result], [yaml, result], [ini, result]])(
  'diff flat %#',
  (received, expected) => {
    expect(received).toBe(expected);
  },
);


test('diff tree', () => {
  expect(tree).toBe(resultTree);
});

test('diff plain', () => {
  expect(plainTree).toBe(resultPlain);
});
