#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

function gen(type) {
  const stylePath = path.join(__dirname, '../src/styles');
  const lessPath = `${fs.readFileSync(path.join(stylePath, `theme-${type}.less`), 'utf8')}`;

  return lessToJs(`${lessPath}`, {
    stripPrefix: true,
    resolveVariables: false,
  });
}

module.exports = {
  dark: gen('dark'),
};
