module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage/unit',
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/services/**/*.js',
    '!src/**/*.test.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/generated/prisma/'
  ],
};
