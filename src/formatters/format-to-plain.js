import { compare } from '../utils';

const normalizeValue = value => (value instanceof Object ? '[complex value]' : `'${value}'`);

const formatElement = {
  // eslint-disable-next-line no-use-before-define
  node: (acc, astElement, parentsName) => [...acc, formatToPlain(astElement.children, `${parentsName}${astElement.name}.`)],
  unchanged: acc => acc,
  deleted: (acc, astElement, parentsName) => [...acc, `Property '${parentsName}${astElement.name}' was removed`],
  added: (acc, astElement, parentsName) => [...acc, `Property '${parentsName}${astElement.name}' was added with value: ${normalizeValue(astElement.value)}`],
  changed: (acc, astElement, parentsName) => [...acc, `Property '${parentsName}${astElement.name}' was updated. From ${normalizeValue(astElement.oldValue)} to ${normalizeValue(astElement.newValue)}`],
};

const formatToPlain = (astTree, parentsName = '') => `${astTree.reduce((acc, astElement) => formatElement[astElement.type](acc, astElement, parentsName), []).sort(compare).join('\n')}`;

export default formatToPlain;
