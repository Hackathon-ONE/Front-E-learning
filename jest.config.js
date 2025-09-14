const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
});

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/__tests__/test-runner.js',
  ],
};

module.exports = createJestConfig(config);
