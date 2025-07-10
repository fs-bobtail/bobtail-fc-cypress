const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    charts: true,
    html: false,
    reportFilename: "[status]_[datetime]-[name]-report",
    timestamp: "longDate",
    reportPageTitle: "Automation Report",
    embeddedScreenshots: true,
    inlineAssets: false,
    saveAllAttempts: true,
    overwrite: false,
    reportDir: "C:/Users/Quixel/Desktop/Reports",
  },
  e2e: {
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {
      config.baseUrl = "https://card-app.bobtailtest.com/";
      return config;
    },
    // chromeWebSecurity: false,
    // experimentalSessionAndOrigin: true,
  },
  video: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
});
