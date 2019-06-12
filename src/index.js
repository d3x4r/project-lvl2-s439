import buildAst from './build-ast';
import readData from './read-data';
import render from './formatters';

export default (beforePath, afterPath, renderType = 'tree') => {
  const beforeData = readData(beforePath);
  const afterData = readData(afterPath);

  const ast = buildAst(beforeData, afterData);
  return render[renderType](ast);
};

// fn('/home/dexer/diffs/before.json', '/home/dexer/diffs/after.json');
// fn('../../before.json', '/home/dexer/diffs/after.json');
