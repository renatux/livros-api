const { defineConfig } = require("cypress");
require('dotenv').config();

const { configurePlugin } = require('cypress-mongodb');

module.exports = defineConfig({
  allowCypressEnv: true,
  env: {
        mongodb: {
            uri: (() => {
                const { MONGODB_USERNAME, MONGODB_PASSWORD, SEUCLUSTER, SEUAPP } = process.env;
                if (MONGODB_USERNAME && MONGODB_PASSWORD && SEUCLUSTER) {
                    return `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${SEUCLUSTER}.mongodb.net/?appName=${SEUAPP || 'livros-api'}`;
                }
                return 'mongodb+srv://usuario:***@cluster.mongodb.net/?appName=livros-api';
            })(),
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
