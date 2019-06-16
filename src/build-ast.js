import _ from 'lodash';

const buildAst = (dataBefore, dataAfter) => {
  const dataBeforeKeys = Object.keys(dataBefore);
  const dataAfterKeys = Object.keys(dataAfter);

  const unionDataKeys = _.union(dataBeforeKeys, dataAfterKeys);

  return unionDataKeys.map((key) => {
    const elementOfDataBefore = dataBefore[key];
    const elementOfDataAfter = dataAfter[key];

    if (_.isObject(elementOfDataBefore) && _.isObject(elementOfDataAfter)) {
      return { name: key, type: 'node', children: buildAst(elementOfDataBefore, elementOfDataAfter) };
    }

    if (elementOfDataBefore === elementOfDataAfter) {
      return { name: key, type: 'unchanged', value: elementOfDataAfter };
    }

    if (!_.isUndefined(elementOfDataBefore) && !_.isUndefined(elementOfDataAfter)) {
      return {
        name: key, type: 'changed', oldValue: elementOfDataBefore, newValue: elementOfDataAfter,
      };
    }

    if (!_.isUndefined(elementOfDataAfter)) {
      return { name: key, type: 'added', value: elementOfDataAfter };
    }

    return { name: key, type: 'deleted', value: elementOfDataBefore };
  });
};

export default buildAst;
