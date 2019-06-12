import _ from 'lodash';
import { getUniqKeys } from './utils';

const getDeletedAstElement = (name, element) => {
  if (typeof element === 'object') {
    return {
      name,
      status: 'deleted',
      type: 'node',
      children: element,
    };
  }
  return {
    name,
    status: 'deleted',
    type: 'leaf',
    value: element,
  };
};

const buildAst = (dataBefore, dataAfter) => {
  const deletedElementsKeys = getUniqKeys(dataBefore, dataAfter);

  const deletedElements = deletedElementsKeys
    .map(key => getDeletedAstElement(key, dataBefore[key]));

  return Object.keys(dataAfter).reduce((acc, afterDataKey) => {
    const name = afterDataKey;
    if (_.has(dataBefore, afterDataKey)) {
      if (typeof dataBefore[afterDataKey] === 'object' && typeof dataAfter[afterDataKey] === 'object') {
        return [...acc, {
          name,
          status: 'unchanged',
          children: buildAst(dataBefore[afterDataKey], dataAfter[afterDataKey]),
          type: 'node',
        }];
      }

      if (typeof dataBefore[afterDataKey] === typeof dataAfter[afterDataKey]) {
        if (dataBefore[afterDataKey] === dataAfter[afterDataKey]) {
          return [...acc, {
            name,
            status: 'unchanged',
            value: dataAfter[afterDataKey],
            type: 'leaf',
          }];
        }
      }

      return [...acc, {
        name,
        status: 'changed',
        newValue: dataAfter[afterDataKey],
        oldValue: dataBefore[afterDataKey],
        type: 'changedElement',
      }];
    }

    if (typeof dataAfter[afterDataKey] === 'object') {
      return [...acc, {
        name,
        status: 'added',
        type: 'node',
        children: dataAfter[afterDataKey],
      }];
    }

    return [...acc, {
      name,
      status: 'added',
      value: dataAfter[afterDataKey],
      type: 'leaf',
    }];
  }, deletedElements);
};

export default buildAst;
