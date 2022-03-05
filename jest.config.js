const config = {
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    // '**/__tests__/**getHands_chi.test.tsx',
    // '**/__tests__/**getHands_others.test.tsx'
    // '**/__tests__/**getDiscardCategories.test.tsx',
    // '**/__tests__/**getHandObjectives.test.tsx',
    // '**/__tests__/**getDiscards.test.tsx',
    // '**/__tests__/**eval.test.tsx'
  ],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(csslessscss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFiles: ["<rootDir>/setupTest.js"],
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: ["node_modules"],
  // roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // transformIgnorePatterns: ["^.+\\.test.(ts|tsx)?$"],
};

module.exports = config;
