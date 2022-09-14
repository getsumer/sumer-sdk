/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    "<rootDir>config.ts"
  ],
  transform: {
    ".(ts|tsx)": "ts-jest",
    "\\.[jt]sx?$": "babel-jest",
  },
  testRegex: "(/test/.*|\\.(test))\\.(ts|tsx)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  globals: {
    "ts-jest": {
      compiler: "ttypescript"
    }
  },
};