const { defineConfig } = require("cypress");

require('dotenv').config({ path: ".env.local" }); // Move this line here

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'https://shelterapp-homehorizon.onrender.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

});

