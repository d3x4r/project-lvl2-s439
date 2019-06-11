import { compare } from './utils';

const Indents = {
  tab: 4,
  gap: 2,
};

const stringify = (obj, indent) => `{\n${Object.keys(obj).map((element) => {
  if (typeof obj[element] === 'object') {
    return `${' '.repeat(indent - Indents.gap)}  ${element}: ${stringify(obj[element], indent + Indents.tab)}`;
  }
  return `${' '.repeat(indent)}${element}: ${obj[element]}`;
}).join('\n')}\n${' '.repeat(indent - Indents.tab)}}`;

const renderElement = {
  unchanged: {
    // eslint-disable-next-line no-use-before-define
    node: (spacing, elem) => `${' '.repeat(spacing)}${elem.name}: ${render(elem.children, spacing + Indents.tab)}`,
    leaf: (spacing, elem) => `${' '.repeat(spacing)}${elem.name}: ${elem.value}`,
  },
  added: {
    node: (spacing, elem) => `${' '.repeat(spacing - Indents.gap)}+ ${elem.name}: ${stringify(elem.children, spacing + Indents.tab)}`,
    leaf: (spacing, elem) => `${' '.repeat(spacing - Indents.gap)}+ ${elem.name}: ${elem.value}`,
  },
  deleted: {
    node: (spacing, elem) => `${' '.repeat(spacing - Indents.gap)}- ${elem.name}: ${stringify(elem.children, spacing + Indents.tab)}`,
    leaf: (spacing, elem) => `${' '.repeat(spacing - Indents.gap)}- ${elem.name}: ${elem.value}`,
  },
};

const render = (astTree, indent = Indents.tab) => `{\n${astTree
  .map(element => renderElement[element.status][element.type](indent, element))
  .sort(compare).join('\n')}\n${' '.repeat(indent - Indents.tab)}}`;

export default render;
