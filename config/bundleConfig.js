const path = require('path');
const ROOT = path.join(__dirname, '..');
console.log('ROOT', ROOT);
const paths = {
  root: ROOT,
  src: path.join(ROOT, 'src'),
  public: path.join(ROOT, 'public'),
  build: path.join(ROOT, 'build'),
  entry: path.join(ROOT, 'src', 'index.tsx'),
  locale: path.join(ROOT, 'locale')
};

const pathsToClean = ['build'];
const cleanConfig = {
  root: paths.root,
  verbose: true
};

module.exports = {
  ROOT,
  paths,
  pathsToClean,
  cleanConfig,
}
