import formatToPlain from './format-to-plain';
import formatToTree from './format-to-tree';
import formatToJson from './format-to-json';

const formatters = {
  plain: formatToPlain,
  tree: formatToTree,
  json: formatToJson,
};

export default (astTree, formatType) => formatters[formatType](astTree);
