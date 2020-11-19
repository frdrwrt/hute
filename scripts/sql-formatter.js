const formatter = require('sql-formatter');
const fs = require('fs');

const filenames = process.argv.slice(2);

filenames.forEach((filename) => {
  const fileContent = fs.readFileSync(filename, 'utf8');
  const formatted = formatter.format(fileContent);
  fs.writeFileSync(filename, formatted, 'utf8');
});
