const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://zero.webappsecurity.com",
    setupNodeEvents(on, config) {
      return config;
    },
  },
  viewportWidth: 1000,
  viewportHeight: 660,
  defaultCommandTimeout: 5000,
  video: true,
  retries: { runMode: 2, openMode: 0 },
});
