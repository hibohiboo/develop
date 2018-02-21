'use strict'

module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/lib/'
  ],
  watchPathIgnorePatterns: ['/fixtures/copy*'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/',
    '/dist/'
  ],
  snapshotSerializers: [
    '<rootDir>/node_modules/pretty-format/build/plugins/convert_ansi.js',
  ],
  modulePathIgnorePatterns: ['examples/.*'],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}