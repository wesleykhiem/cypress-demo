import {defineConfig } from 'cypress';
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin';
import FileChecker from 'cyframework/cypress/support/fileUtil';
export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  //reporter:np
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    screenshotOnRunFailure: true,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: "IAI Cypress Automation Report",
    embeddedScreenshots: true,
    saveAllattempts: false,
    inlineAssets: true
  },
  
  e2e: {
    baseUrl: 'http://localhost:3090',
    specPattern: '**/e2e/*.cy.js',
    supportFolder: 'cyframework/cypress/support',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      addMatchImageSnapshotPlugin(on);
      require('cypress-mochawesome-reporter/plugin')(on);
      //1. Begin config tempDir for the test
      const fs = require('fs');
      const path = require('path');
      const os = require('os');

      on('task', {
        generateUniqueName(prefix: string='Session') {
          const date = new Date();
          const formattedDate = (date.getMonth() + 1).toString().padStart(2, '0')
                              + date.getDate().toString().padStart(2, '0')
                              + date.getFullYear().toString().slice(-2); // Format: MMDDYY
          const formattedTime = date.getHours().toString().padStart(2, '0')
                              + date.getMinutes().toString().padStart(2, '0')
                              + date.getSeconds().toString().padStart(2, '0'); // Format: HHMMSS
          return `${prefix}_${formattedDate}${formattedTime}`;
        },
        createIAISessionDir() {
          const tempDir = os.tmpdir(); // // Get the system's temporary directory path
          const testDir = path.join(tempDir, 'IAISession'); // Create a path for the test directory
          if (!fs.existsSync(testDir)){
            fs.mkdirSync(testDir); //Create the directory if it does not exist
          }
          return testDir; // Return the path of the newly created temporary directory
        },
        async checkFileExistence({ directoryPath, fileName }) {
          return FileChecker.fileExistsInFolderAndSubfolders(directoryPath, fileName);
        },
      });

      return config;
      //1. End config tempDir for the test

    },
    testIsolation: true,
    defaultCommandTimeout: 40000,
  },
});
