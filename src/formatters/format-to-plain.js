import { compare } from '../utils';

const normalizeValue = value => (value instanceof Object ? '[complex value]' : `'${value}'`);

const formatElement = {
  node: (astElement, parentsName, fn) => fn(astElement.children, `${parentsName}${astElement.name}.`),
  deleted: (astElement, parentsName) => `Property '${parentsName}${astElement.name}' was removed`,
  added: (astElement, parentsName) => `Property '${parentsName}${astElement.name}' was added with value: ${normalizeValue(astElement.value)}`,
  changed: (astElement, parentsName) => `Property '${parentsName}${astElement.name}' was updated. From ${normalizeValue(astElement.oldValue)} to ${normalizeValue(astElement.newValue)}`,
};

const formatToPlain = (astTree, parentsName = '') => `${astTree
  .filter(astElement => astElement.type !== 'unchanged')
  .map(astElement => formatElement[astElement.type](astElement, parentsName, formatToPlain))
  .sort(compare).join('\n')}`;

export default formatToPlain;
