import { compare } from '../utils';

const Indents = {
  tab: 4,
  gap: 2,
};

const stringify = (obj, indent) => {
  if (obj instanceof Object) {
    return `{\n${Object.keys(obj).map((element) => {
      if (typeof obj[element] === 'object') {
        return `${' '.repeat(indent - Indents.gap)}  ${element}: ${stringify(obj[element], indent + Indents.tab)}`;
      }
      return `${' '.repeat(indent)}${element}: ${obj[element]}`;
    }).join('\n')}\n${' '.repeat(indent - Indents.tab)}}`;
  }
  return obj;
};

const renderElement = {
  unchanged: {
    // eslint-disable-next-line no-use-before-define
    node: (spacing, elem) => `${' '.repeat(spacing)}${elem.name}: ${renderJson(elem.children, spacing + Indents.tab)}`,
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
  changed: {
    changedElement: (spacing, elem) => `${' '.repeat(spacing - Indents.gap)}+ ${elem.name}: ${stringify(elem.newValue, spacing + Indents.tab)}\n${' '.repeat(spacing - Indents.gap)}- ${elem.name}: ${stringify(elem.oldValue, spacing + Indents.tab)}`,
  },
};

const renderJson = (astTree, indent = Indents.tab) => `{\n${astTree
  .map(element => renderElement[element.status][element.type](indent, element))
  .sort(compare).join('\n')}\n${' '.repeat(indent - Indents.tab)}}`;

export default renderJson;
