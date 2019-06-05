import fs from 'fs';
import genDiff from '../src';

const received = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
const expected = fs.readFileSync('__tests__/__fixtures__/diff-jsons.txt', 'utf-8');

test('diff', () => {
  expect(received).toBe(expected);
});
