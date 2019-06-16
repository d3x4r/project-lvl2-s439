import formatToPlain from './format-to-plain';
import formatToTree from './format-to-tree';

const formatters = {
  plain: formatToPlain,
  tree: formatToTree,
  json: JSON.stringify,
};

export default (astTree, formatType) => formatters[formatType](astTree);
