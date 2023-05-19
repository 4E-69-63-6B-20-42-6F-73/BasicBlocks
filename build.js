const fs = require('fs');
const path = require('path');

function concatenateFiles(directory, outputFile, fileExtension) {
  const concatenatedContent = fs.readdirSync(directory)
    .filter(file => file.endsWith(fileExtension))
    .map(file => path.join(directory, file))
    .map(file => fs.readFileSync(file, 'utf8'))
    .join('\n');

  fs.writeFileSync(outputFile, concatenatedContent, 'utf8');

  console.log('Files condensed successfully!');
}

concatenateFiles('./components', './dist/app.js', '.js');
concatenateFiles('./components', './dist/app.css', '.css');
