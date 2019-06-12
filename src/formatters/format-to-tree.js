import { compare } from '../utils';

const Indents = {
  tab: 4,
  gap: 2,
};

const stringify = (element, indent) => {
  if (!(element instanceof Object)) {
    return element;
  }
  return `{\n${Object.keys(element).map((objectKey) => {
    if (typeof element[objectKey] === 'object') {
      return `${' '.repeat(indent - Indents.gap)}  ${objectKey}: ${stringify(element[objectKey], indent + Indents.tab)}`;
    }
    return `${' '.repeat(indent)}${objectKey}: ${element[objectKey]}`;
  }).join('\n')}\n${' '.repeat(indent - Indents.tab)}}`;
};

const formatElement = {
  unchanged: {
    // eslint-disable-next-line no-use-before-define
    node: (spacing, element) => `${' '.repeat(spacing)}${element.name}: ${formatToTree(element.children, spacing + Indents.tab)}`,
    leaf: (spacing, element) => `${' '.repeat(spacing)}${element.name}: ${element.value}`,
  },
  added: {
    node: (spacing, element) => `${' '.repeat(spacing - Indents.gap)}+ ${element.name}: ${stringify(element.children, spacing + Indents.tab)}`,
    leaf: (spacing, element) => `${' '.repeat(spacing - Indents.gap)}+ ${element.name}: ${element.value}`,
  },
  deleted: {
    node: (spacing, element) => `${' '.repeat(spacing - Indents.gap)}- ${element.name}: ${stringify(element.children, spacing + Indents.tab)}`,
    leaf: (spacing, element) => `${' '.repeat(spacing - Indents.gap)}- ${element.name}: ${element.value}`,
  },
  changed: {
    changedElement: (spacing, element) => `${' '.repeat(spacing - Indents.gap)}+ ${element.name}: ${stringify(element.newValue, spacing + Indents.tab)}\n${' '.repeat(spacing - Indents.gap)}- ${element.name}: ${stringify(element.oldValue, spacing + Indents.tab)}`,
  },
};

const formatToTree = (astTree, indent = Indents.tab) => `{\n${astTree
  .map(element => formatElement[element.status][element.type](indent, element))
  .sort(compare).join('\n')}\n${' '.repeat(indent - Indents.tab)}}`;

export default formatToTree;
