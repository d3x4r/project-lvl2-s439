import { compare } from '../utils';

const normalizeValue = value => (value instanceof Object ? '[complex value]' : `'${value}'`);

const normalizeElementValue = element => (element.type === 'node' ? '[complex value]' : `'${element.value}'`);

const renderElement = {
  unchanged: (acc, astElement, path) => {
    if (astElement.type === 'node') {
      // eslint-disable-next-line no-use-before-define
      return [...acc, renderPlain(astElement.children, `${path}${astElement.name}.`)];
    }
    return acc;
  },
  deleted: (acc, astElement, path) => [...acc, `Property '${path}${astElement.name}' was removed`],
  added: (acc, astElement, path) => [...acc, `Property '${path}${astElement.name}' was added with value: ${normalizeElementValue(astElement)}`],
  changed: (acc, astElement, path) => [...acc, `Property '${path}${astElement.name}' was updated. From ${normalizeValue(astElement.oldValue)} to ${normalizeValue(astElement.newValue)}`],
};

const renderPlain = (astTree, path = '') => `${astTree.reduce((acc, astElement) => renderElement[astElement.status](acc, astElement, path), []).sort(compare).join('\n')}`;

export default renderPlain;
