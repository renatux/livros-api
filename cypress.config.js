const { defineConfig } = require("cypress");
require('dotenv').config();

const { configurePlugin } = require('cypress-mongodb');

module.exports = defineConfig({
  allowCypressEnv: true,
  env: {
        mongodb: {
            uri: process.env.MONGODB_URI || 'mongodb+srv://alucardsp_db_user:***@szlab.crjhpiy.mongodb.net/?appName=szlab',
            database: 'test',
            collection: 'livros'
        }
    },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    configurePlugin(on);
    },
  },
});
