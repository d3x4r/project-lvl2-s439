import _ from 'lodash';
import { compare } from '../utils';

const indents = {
  tab: 4,
  gap: 2,
};

const stringify = (elementOfAst, indent = 0) => {
  if (!(elementOfAst instanceof Object)) {
    return elementOfAst;
  }
  const keysOfAstValues = Object.keys(elementOfAst);
  return `{\n${keysOfAstValues.map(keyOfAstValue => `${' '.repeat(indent - indents.gap)}  ${keyOfAstValue}: ${stringify(elementOfAst[keyOfAstValue], indent + indents.tab)}`)
    .join('\n')}\n${' '.repeat(indent - indents.tab)}}`;
};

const formatElement = {
  node: (spacing, element, f) => `${' '.repeat(spacing)}${element.name}: ${f(element.children, spacing + indents.tab)}`,
  unchanged: (spacing, element) => `${' '.repeat(spacing)}${element.name}: ${element.value}`,
  added: (spacing, element) => `${' '.repeat(spacing - indents.gap)}+ ${element.name}: ${stringify(element.value, spacing + indents.tab)}`,
  deleted: (spacing, element) => `${' '.repeat(spacing - indents.gap)}- ${element.name}: ${stringify(element.value, spacing + indents.tab)}`,
  changed: (spacing, element) => [`${' '.repeat(spacing - indents.gap)}+ ${element.name}: ${stringify(element.newValue, spacing + indents.tab)}`, `${' '.repeat(spacing - indents.gap)}- ${element.name}: ${stringify(element.oldValue, spacing + indents.tab)}`],
};

const formatToTree = (astTree, indent = indents.tab) => `{\n${_.flatten(astTree
  .map(element => formatElement[element.type](indent, element, formatToTree))
  .sort(compare))
  .join('\n')}\n${' '.repeat(indent - indents.tab)}}`;

export default formatToTree;
