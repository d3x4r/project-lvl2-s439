import { compare } from '../utils';

const normalizeValue = value => (value instanceof Object ? '[complex value]' : `'${value}'`);

const getNormalizeValue = element => (element.type === 'node' ? '[complex value]' : `'${element.value}'`);

const formatElement = {
  unchanged: (acc, astElement, parentsName) => {
    if (astElement.type === 'node') {
      // eslint-disable-next-line no-use-before-define
      return [...acc, formatToPlain(astElement.children, `${parentsName}${astElement.name}.`)];
    }
    return acc;
  },
  deleted: (acc, astElement, parentsName) => [...acc, `Property '${parentsName}${astElement.name}' was removed`],
  added: (acc, astElement, parentsName) => [...acc, `Property '${parentsName}${astElement.name}' was added with value: ${getNormalizeValue(astElement)}`],
  changed: (acc, astElement, parentsName) => [...acc, `Property '${parentsName}${astElement.name}' was updated. From ${normalizeValue(astElement.oldValue)} to ${normalizeValue(astElement.newValue)}`],
};

const formatToPlain = (astTree, parentsName = '') => `${astTree.reduce((acc, astElement) => formatElement[astElement.status](acc, astElement, parentsName), []).sort(compare).join('\n')}`;

export default formatToPlain;
