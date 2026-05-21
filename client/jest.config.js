
module.exports = {
  testEnvironment: "jest-environment-jsdom", 
  testPathIgnorePatterns: [
    "./__tests__/homepage/helpers.js",
    "./__tests__/challenge/helpers.js",
    "./__tests__/signup/helpers.js",
    "./__tests__/login/helpers.js"
  ],
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