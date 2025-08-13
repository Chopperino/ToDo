module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage/integration',
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/generated/prisma/',
  ],
};
