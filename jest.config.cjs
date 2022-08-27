module.exports = {
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true
      }
    ],
    '^.+\\.[jt]s$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  coverageReporters: ['html', 'text-summary'],
  moduleNameMapper: {
    '^\\$lib(.*)$': '<rootDir>/src/lib$1'
  },
  // modulePathIgnorePatterns: ['package'],
  transformIgnorePatterns: ['/node_modules/(?!svelte-fa)(.*)'],
  automock: false,
  setupFiles: ['./setupJest.js'],
  testTimeout: 60000
};
