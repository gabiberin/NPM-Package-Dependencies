module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["dotenv/config"],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/__tests__/tsconfig.json',
    },
  },
};
