import _ from 'lodash';
import { AstElement, AstNode } from './ast-objects';
import { compare, objectMissingKeys } from './utils';
import readData from './read-data';

export default (beforePath, afterPath) => {
  const beforeData = readData(beforePath);
  const afterData = readData(afterPath);

  const iter = (firstData, secondData) => {
    const firstObjectUniqKeys = objectMissingKeys(firstData, secondData);

    const firstObjectAstElements = firstObjectUniqKeys.map((key) => {
      const types = {
        object: AstNode,
        string: AstElement,
      };
      return new types[typeof firstData[key]](key, 'deleted', firstData[key]);
    });

    return Object.keys(secondData).reduce((acc, secondDataKey) => {
      if (_.has(firstData, secondDataKey) && typeof firstData[secondDataKey] === 'object' && typeof secondData[secondDataKey] === 'object') {
        return [...acc, new AstNode(secondDataKey, 'unchanged', iter(firstData[secondDataKey], secondData[secondDataKey]))];
      }

      if (_.has(firstData, secondDataKey) && typeof firstData[secondDataKey] === 'string' && typeof secondData[secondDataKey] === 'string') {
        if (firstData[secondDataKey] === secondData[secondDataKey]) {
          return [...acc, new AstElement(secondDataKey, 'unchanged', secondData[secondDataKey])];
        }
        return [...acc, new AstElement(secondDataKey, 'added', secondData[secondDataKey]), new AstElement(secondDataKey, 'deleted', firstData[secondDataKey])];
      }

      if (_.has(firstData, secondDataKey)) {
        const getObject1 = (data, name, status) => {
          if (typeof data === 'object') {
            return new AstNode(name, status, data);
          }
          return new AstElement(name, status, data);
        };
        return [...acc, getObject1(secondData[secondDataKey], secondDataKey, 'added'), getObject1(firstData[secondDataKey], secondDataKey, 'deleted')];
      }

      if (typeof secondData[secondDataKey] === 'object') {
        return [...acc, new AstNode(secondDataKey, 'added', secondData[secondDataKey])];
      }

      return [...acc, new AstElement(secondDataKey, 'added', secondData[secondDataKey])];
    }, firstObjectAstElements);
  };
  const result = iter(beforeData, afterData);
  console.log(result);

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
