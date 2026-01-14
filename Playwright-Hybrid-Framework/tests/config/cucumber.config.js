module.exports = {
  require: [
    'tests/steps/**/*.ts',
    'tests/base/hooks.ts'
  ],
  requireModule: ['ts-node/register/transpile-only'],
  parallel: 4
};
