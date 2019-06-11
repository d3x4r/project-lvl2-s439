import buildAst from './build-ast';
import readData from './read-data';
import render from './render';
// import plain from './plain';

export default (beforePath, afterPath) => {
  const beforeData = readData(beforePath);
  const afterData = readData(afterPath);

  const ast = buildAst(beforeData, afterData);
  return render(ast);
  // return plain(ast);
};

// fn('/home/dexer/diffs/before.json', '/home/dexer/diffs/after.json');
// fn('../../before.json', '/home/dexer/diffs/after.json');
