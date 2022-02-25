const fs = require('fs');

// Creates the compiledDate.js file that contains the compile date as a string, so it can be displayed where wanted in the app.
const d = new Date();
const fileContent = `module.exports = ['${d.toLocaleString()}'];\n`;
fs.writeFileSync('./src/js/compiledDate.js', fileContent, { encoding: 'utf8', flag: 'w' });
