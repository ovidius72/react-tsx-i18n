/**
 * @description Read environment files into Objects|Array.
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadEnvs(addToProcess = true, mode) {
  const envs = {};
  const $NODE_ENV = mode || process.env.NODE_ENV || 'development';
  const envFiles = fs.readdirSync(path.join(__dirname, 'envs'));

  envFiles.forEach(file => {
    if (file === '.env' || file === `.env.${$NODE_ENV}` || file === `.env.${$NODE_ENV}.local`) {
      const filePath = fs.readFileSync(path.join(__dirname, 'envs', file));
      const config = dotenv.parse(filePath);
      const keys = Object.keys(config);
      keys.forEach(k => {
        if (addToProcess) process.env[k] = config[k];
        envs[k] = config[k];
      });
    }
  });
  return envs;
}

const getEnvs = mode => {
  const envsObject = loadEnvs(true, mode);
  const envs = Object.keys(envsObject).reduce((acc, curr) => {
    acc[`process.env.${curr}`] = JSON.stringify(envsObject[curr]);
    return acc;
  }, {});
  return envsObject;
}
module.exports = {
  asObject: addToProcess => loadEnvs(addToProcess),
  asArray: addToProcess => Object.keys(loadEnvs(addToProcess)),
  getEnvs,
};
