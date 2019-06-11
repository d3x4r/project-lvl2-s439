import buildAst from './build-ast';
import readData from './read-data';
import render from './render';

export default (beforePath, afterPath) => {
  const beforeData = readData(beforePath);
  const afterData = readData(afterPath);

  const ast = buildAst(beforeData, afterData);
  return render(ast);
};

// fn('/home/dexer/diffs/before.json', '/home/dexer/diffs/after.json');
// fn('../../before.json', '/home/dexer/diffs/after.json');
