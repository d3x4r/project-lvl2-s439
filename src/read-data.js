import path from 'path';
import fs from 'fs';
import parsers from './parsers';

export default (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath).slice(1);
  return parsers[extension](data);
};
