import fs from 'fs';
import genDiff from '../src';

const receivedJson = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');

const receivedYaml = genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');

const expected = fs.readFileSync('__tests__/__fixtures__/diff-jsons.txt', 'utf-8');

test('jsonTest', () => {
  expect(receivedJson).toBe(expected);
});

test('yamlTest', () => {
  expect(receivedYaml).toBe(expected);
});
