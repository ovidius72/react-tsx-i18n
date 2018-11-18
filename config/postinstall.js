const fs = require('fs');
const spawn = require('child_process').spawn;

fs.readdir('../locale', (err, files) => {
  if (err || files.length === 0) {
    // no locale set up.
    process.chdir('..');
    const child = spawn('./node_modules/.bin/cross-env', ['NODE_ENV=lingui', '../node_modules/.bin/lingui']);
  }
});
