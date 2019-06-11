import _ from 'lodash';
import { uniqKeys } from './utils';

class ElementOfAst {
  constructor(name, status) {
    this.name = name;
    this.status = status;
  }
}

class NodeOfAst extends ElementOfAst {
  constructor(name, status, children) {
    super(name, status);
    this.children = children;
    this.type = 'node';
  }
}

class LeafOfAst extends ElementOfAst {
  constructor(name, status, value) {
    super(name, status);
    this.value = value;
    this.type = 'leaf';
  }
}

class ChangedElementOfAst extends ElementOfAst {
  constructor(name, status, value1, value2) {
    super(name, status);
    this.newValue = value1;
    this.oldValue = value2;
    this.type = 'changedElement';
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
      return [...acc, elementOfAst(secondDataKey, 'unchanged', buildAst(firstData[secondDataKey], secondData[secondDataKey]))];
    }

    // eslint-disable-next-line max-len
    if (_.has(firstData, secondDataKey) && typeof firstData[secondDataKey] === typeof secondData[secondDataKey]) {
      if (firstData[secondDataKey] === secondData[secondDataKey]) {
        return [...acc, elementOfAst(secondDataKey, 'unchanged', secondData[secondDataKey])];
      }

      return [...acc, new ChangedElementOfAst(secondDataKey, 'changed', secondData[secondDataKey], firstData[secondDataKey])];
    }

    if (_.has(firstData, secondDataKey)) {
      return [...acc, new ChangedElementOfAst(secondDataKey, 'changed', secondData[secondDataKey], firstData[secondDataKey])];
    }

    return [...acc, elementOfAst(secondDataKey, 'added', secondData[secondDataKey])];
  }, firstObjectAstElements);
};

export default buildAst;
