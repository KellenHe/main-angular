#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, `../`);
const themeRoot = path.join(root, `src/assets/`);

const vars = require('./vars');

fs.writeFileSync(path.join(themeRoot, 'theme-dark.js'), `module.exports = ${JSON.stringify(vars.dark)}`, 'utf8');
