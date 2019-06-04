import genDiff from '../src';

test('adds 1 + 2 to equal 3', () => {
  expect(genDiff('/home/dexer/diffs/before.json', '/home/dexer/diffs/after.json')).toBe(3);
});