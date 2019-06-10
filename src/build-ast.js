import _ from 'lodash';
import { uniqKeys } from './utils';

class NodeOfAst {
  constructor(name, status, children) {
    this.name = name;
    this.status = status;
    this.children = children;
    this.type = 'node';
  }
}

class LeafOfAst {
  constructor(name, status, value) {
    this.name = name;
    this.status = status;
    this.value = value;
    this.type = 'leaf';
  }
}

const typeElementsOfAst = {
  object: NodeOfAst,
  string: LeafOfAst,
  boolean: LeafOfAst,
  number: LeafOfAst,
};

const elementOfAst = (key, status, element) => {
  const type = typeof element;
  return new typeElementsOfAst[type](key, status, element);
};

const buildAst = (firstData, secondData) => {
  const firstObjectUniqKeys = uniqKeys(firstData, secondData);

  const firstObjectAstElements = firstObjectUniqKeys.map(key => elementOfAst(key, 'deleted', firstData[key]));

  return Object.keys(secondData).reduce((acc, secondDataKey) => {
    if (_.has(firstData, secondDataKey) && typeof firstData[secondDataKey] === 'object' && typeof secondData[secondDataKey] === 'object') {
      return [...acc, new NodeOfAst(secondDataKey, 'unchanged', buildAst(firstData[secondDataKey], secondData[secondDataKey]))];
    }

    // eslint-disable-next-line max-len
    if (_.has(firstData, secondDataKey) && typeof firstData[secondDataKey] === typeof secondData[secondDataKey]) {
      if (firstData[secondDataKey] === secondData[secondDataKey]) {
        return [...acc, new LeafOfAst(secondDataKey, 'unchanged', secondData[secondDataKey])];
      }
      return [...acc, new LeafOfAst(secondDataKey, 'added', secondData[secondDataKey]), new LeafOfAst(secondDataKey, 'deleted', firstData[secondDataKey])];
    }

    if (_.has(firstData, secondDataKey)) {
      return [...acc, elementOfAst(secondDataKey, 'added', secondData[secondDataKey]), elementOfAst(secondDataKey, 'deleted', firstData[secondDataKey])];
    }

    return [...acc, elementOfAst(secondDataKey, 'added', secondData[secondDataKey])];
  }, firstObjectAstElements);
};

export default buildAst;
