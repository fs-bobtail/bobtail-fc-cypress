const { defineConfig } = require("cypress");
const path = require("path");


module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    html: false,
    reportFilename: "[status]_[datetime]-[name]-report",
    timestamp: "longDate",
    reportPageTitle: 'Automation Report',
    embeddedScreenshots: true,
    inlineAssets: false,
    saveAllAttempts: true,
    overwrite: false,
    reportDir: "C:/Users/Quixel/Desktop/Reports"
  },
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {

      config.baseUrl = 'https://card-app.bobtailtest.com/';
      return config;
      // const version = config.env.url
      // const urls = {
      //   url: "https://mubeen.com/"
      // }
      // config.baseUrl = urls[version]
      // return config
    },
  },
  video: true,
})