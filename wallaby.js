module.exports = function(w) {
  return {
    files: [
      'tsconfig.json',
      'src/**/*.ts',
      'stubs/**/*.*',
      '!src/**/__tests__/*.ts',
      'test/test-setup.js',
      'test/test-shim.js',
    ],

    tests: ['src/**/__tests__/*.spec.ts'],

    env: {
      type: 'node',
    },

    testFramework: 'jest',
    compilers: {
      'src/**/*.ts?(x)': w.compilers.typeScript({ module: 'commonjs' }),
    },

    setup: function(wallaby) {
      const jestConfig = require('./package.json').jest;
      jestConfig.modulePaths = jestConfig.modulePaths.map(p =>
        p.replace('<rootDir>', wallaby.projectCacheDir)
      );
      wallaby.testFramework.configure(jestConfig);
    },
  };
};
