// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '../../cyframework/cypress/support/commands'
import {addMatchImageSnapshotCommand} from '@simonsmith/cypress-image-snapshot/command'
import 'cypress-mochawesome-reporter/register.js';
addMatchImageSnapshotCommand()
// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
    cy.task('createIAISessionDir').then((dir) => {
      Cypress.env('workingSessionDir', dir);
    });
  });

beforeEach(() => {
    cy.wrap(Cypress.currentTest.title).then(($title) => {
      const id = $title.substring(0, 6).trim();
      cy.task('generateUniqueName', `TC${id}`).then((name) => {
        Cypress.env('workingSessionName', name);
      });
    });
  });