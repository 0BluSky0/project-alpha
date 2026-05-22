
module.exports = {
  testTimeout: 10000,
  testEnvironment: "jest-environment-jsdom", 

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],

  // Tell Jest what files to measure coverage on
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!jest.config.js",
    "!**/__mocks__/**"
  ],

  collectCoverage: true,
  coverageProvider: "babel",
  
  transformIgnorePatterns: [
    "node_modules/(?!(jsdom|canvas-confetti)/)"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg|woff2?)$": "<rootDir>/__mocks__/fileMock.js",

    "^html-encoding-sniffer$": "<rootDir>/__mocks__/emptyModule.js",
    "^@exodus/bytes$": "<rootDir>/__mocks__/emptyModule.js",
    "^html-encoding-sniffer$": "<rootDir>/__mocks__/emptyModule.js"
  },
  globals: {
    TextEncoder: require('util').TextEncoder,
    TextDecoder: require('util').TextDecoder,
    localStorage: true
  }

};