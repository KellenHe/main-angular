#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

function getLessVars(lessPath) {
  const stylePath = path.join(__dirname, '../src/styles');
  let lessContext = fs.readFileSync(path.join(stylePath, lessPath), 'utf8');
  const lessArr = lessContext.split(';');
  if (lessArr && lessArr.length > 0) {
    lessArr.forEach(arr => {
      if (arr.indexOf('@import') === 0) {
        lessContext = lessContext.replace(arr, '');
        const filePath = arr.split(' ')[1].replace(/['"]+/g, '').trim();
        lessContext = lessContext + getLessVars(filePath);
      }
    });
  }
  return lessContext;
}

function gen(type) {
  const lessContext = getLessVars(`theme-${type}.less`);

  return lessToJs(`${lessContext}`, {
    stripPrefix: true,
    resolveVariables: false,
  });
}

module.exports = {
  dark: gen('dark'),
};
