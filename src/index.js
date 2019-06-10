import _ from 'lodash';
import buildAst from './build-ast';
import { compare } from './utils';
import readData from './read-data';

export default (beforePath, afterPath) => {
  const beforeData = readData(beforePath);
  const afterData = readData(afterPath);

  console.log(buildAst(beforeData, afterData)[2].children);

  const diffsWithoutNewData = Object.keys(beforeData).reduce((acc, beforeObjKey) => {
    const objEqualPredicate = beforeData[beforeObjKey] === afterData[beforeObjKey];

    if (_.has(afterData, beforeObjKey) && objEqualPredicate) {
      return [`  ${beforeObjKey}: ${afterData[beforeObjKey]}`, ...acc];
    }

    if (_.has(afterData, beforeObjKey) && !objEqualPredicate) {
      return [
        `+ ${beforeObjKey}: ${afterData[beforeObjKey]}`,
        `- ${beforeObjKey}: ${beforeData[beforeObjKey]}`,
        ...acc,
      ];
    }
    return [`- ${beforeObjKey}: ${beforeData[beforeObjKey]}`, ...acc];
  }, []);

  const newKeysInAfterData = Object.keys(afterData).reduce((acc, afterObjKey) => {
    if (!_.has(beforeData, afterObjKey)) {
      return [`+ ${afterObjKey}: ${afterData[afterObjKey]}`, ...acc];
    }
    return acc;
  }, []);
  return `{\n  ${[...diffsWithoutNewData, ...newKeysInAfterData].sort(compare).join('\n  ')}\n}`;
};

// fn('/home/dexer/diffs/before.json', '/home/dexer/diffs/after.json');
// fn('../../before.json', '/home/dexer/diffs/after.json');
