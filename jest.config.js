module.exports = {
  preset: 'ts-jest',
  cacheDirectory: '.tmp/jestCache',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  setupFiles: ['<rootDir>/config.ts'],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                node: "current",
              },
            },
          ],
        ],
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(\\.pnpm|@wagmi)/)"],
}
