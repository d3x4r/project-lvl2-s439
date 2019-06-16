import path from 'path';
import fs from 'fs';
import buildAst from './build-ast';
import format from './formatters';
import parsers from './parsers';

const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath).slice(1);
  return parsers(data, extension);
};

export default (pathToDataBefore, pathToDataAfter, formatType = 'tree') => {
  const dataBefore = readData(pathToDataBefore);
  const dataAfter = readData(pathToDataAfter);
  const astTree = buildAst(dataBefore, dataAfter);
  return format(astTree, formatType);
};
