import _ from 'lodash';
import buildAst from './build-ast';
import { compare } from './utils';
import readData from './read-data';

export default (beforePath, afterPath) => {
  const beforeData = readData(beforePath);
  const afterData = readData(afterPath);

  const ast = buildAst(beforeData, afterData);
  // console.log(ast);

  // const str = (obj) => {
  //   // return Object.keys(obj).map();
  //   return `{Object.keys(obj).map()}`;
  // };

  const render = (astTree, indent = 4) => {
    
    return `{\n${astTree.map((element) => {
      if (element.status === 'unchanged') {
        if (element.type === 'node') {
          return `${' '.repeat(indent)}${element.name}: ${render(element.children, indent + 4)}`;
        }
        return `${' '.repeat(indent)}${element.name}: ${element.value}`;
      }

      if (element.status === 'added') {
        if (element.type === 'node') {
          console.log(str(element.children));
          return `${' '.repeat(indent - 2)}+ ${element.name}: ${JSON.stringify(element.children)}`;
        }
        return `${' '.repeat(indent - 2)}+ ${element.name}: ${element.value}`;
      }

      if (element.status === 'deleted') {
        if (element.type === 'node') {
          return `${' '.repeat(indent - 2)}- ${element.name}: ${JSON.stringify(element.children)}`;
        }
        return `${' '.repeat(indent - 2)}- ${element.name}: ${element.value}`;
      }
    }).sort(compare).join('\n')}\n${' '.repeat(indent - 4)}}`;
  };
  console.log(render(ast));


  // const diffsWithoutNewData = Object.keys(beforeData).reduce((acc, beforeObjKey) => {
  //   const objEqualPredicate = beforeData[beforeObjKey] === afterData[beforeObjKey];

  //   if (_.has(afterData, beforeObjKey) && objEqualPredicate) {
  //     return [`  ${beforeObjKey}: ${afterData[beforeObjKey]}`, ...acc];
  //   }

  //   if (_.has(afterData, beforeObjKey) && !objEqualPredicate) {
  //     return [
  //       `+ ${beforeObjKey}: ${afterData[beforeObjKey]}`,
  //       `- ${beforeObjKey}: ${beforeData[beforeObjKey]}`,
  //       ...acc,
  //     ];
  //   }
  //   return [`- ${beforeObjKey}: ${beforeData[beforeObjKey]}`, ...acc];
  // }, []);

  // const newKeysInAfterData = Object.keys(afterData).reduce((acc, afterObjKey) => {
  //   if (!_.has(beforeData, afterObjKey)) {
  //     return [`+ ${afterObjKey}: ${afterData[afterObjKey]}`, ...acc];
  //   }
  //   return acc;
  // }, []);
  // return `{\n  ${[...diffsWithoutNewData, ...newKeysInAfterData].sort(compare).join('\n  ')}\n}`;
};

// fn('/home/dexer/diffs/before.json', '/home/dexer/diffs/after.json');
// fn('../../before.json', '/home/dexer/diffs/after.json');
