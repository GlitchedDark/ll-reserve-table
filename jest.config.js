const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "T:/CodingStuff/Nextjs Learning/Coursera Front End Dev Final/ll-reserve-table",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["T:/CodingStuff/Nextjs Learning/Coursera Front End Dev Final/ll-reserve-table/jest.setup.js"],
  testEnvironment: "jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);