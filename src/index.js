import buildAst from './build-ast';
import readData from './read-data';
import format from './formatters';

export default (pathToDataBefore, pathToDataAfter, formatType = 'tree') => {
  const dataBefore = readData(pathToDataBefore);
  const dataAfter = readData(pathToDataAfter);

  const astTree = buildAst(dataBefore, dataAfter);
  return format[formatType](astTree);
};
