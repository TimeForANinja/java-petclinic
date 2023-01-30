const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    frontendUrl: 'http://frontend:8080',
    backendUrl: 'http://backend:9966',
    experimentalStudio: true,
  },
});
