import fs from 'fs';
import _ from 'lodash';
// import path from 'path';

export default (beforePath, afterPath) => {
  const beforeData = JSON.parse(fs.readFileSync(beforePath));
  const afterData = JSON.parse(fs.readFileSync(afterPath));

  const diffsWithoutNewData = Object.keys(beforeData).reduce((acc, beforeObjKey) => {
    const objEqualPredicate = beforeData[beforeObjKey] === afterData[beforeObjKey];

    if (_.has(afterData, beforeObjKey) && objEqualPredicate) {
      return [`${beforeObjKey}: ${afterData[beforeObjKey]}`, ...acc];
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
  return [...diffsWithoutNewData, ...newKeysInAfterData].join(' ');
};

// fn('/home/dexer/diffs/before.json', '/home/dexer/diffs/after.json');
// fn('../../before.json', '/home/dexer/diffs/after.json');
