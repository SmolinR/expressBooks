/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 60000,
  testMatch: [
    '<rootDir>/__tests__/*.test.ts',
  ],
};
