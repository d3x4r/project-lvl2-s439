import _ from 'lodash';

const compare = (first, second) => {
  const a = _.trim(_.trim(first, '+ -'));
  const b = _.trim(_.trim(second, '+ -'));
  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }
  return 0;
};

export default compare;
