import { should } from "chai";
import {popupDialog} from "./PopupDialog";

class HomePage {
    selectSessionButton = '[title="Select Session"]';
    createANewSessionButton = '[title="Create a New Session"]';
    importSessionsButton = '[title="Import Session(s)"]';
    showArchivedSessionsButton = '[title="Show Archived Session(s)"]';
    showUnarchivedSessionsButton = '[title="Show Unarchived Session(s)"]';
    archiveSessionButton = '[title="Archive Session"]';
    archiveSessionsButton = '[title="Archive Session(s)"]';
    deleteSessionButton = '[title="Delete Session"]';
    deleteSessionsButton = '[title="Delete Session(s)"]';
    exportSessionButton = '[title="Export Session"]';
    openSessionTile = '[title="Open Session"]';

    // Export Dialog
    currentPathInput = '.popup-modal-dialog > .grid > .form-text';
    fileBrowserOkButton = '#file-browser-ok-button';

    // Import Dialog
    sessionNameInput = '#session-name';
    sessionPathInput = '#session-path';
    importPathInput = '#import-path';
    selectBaseVdsCheckbox = '[title="Check to select base VDS"]';
    baseSeismicVolumeInput = '#baseSeismicVolume';
    importSessionOkButton = '#import-session-ok-button';

    // Selector for form "Create Session"
    baseVDSInput = '#base-vds';
    browseButton = '[data-testid="path-selector-button"]';
    cancelButton = '#create-edit-session-cancel-button';
    createSessionButton = '#create-edit-session-ok-button';

    // visit IAI local
    visit() {
        cy.visit('/')
    }

    clickShowArchivedSessions() {
        cy.get(this.showArchivedSessionsButton).click();
    }

    selectFirstSession() {
      cy.get(this.selectSessionButton).first().click();
    }

    getFirstSessionTile() {
      return cy.get(this.openSessionTile).first(); 
    }

    openFirstSession() {
      cy.get(this.openSessionTile).first().click();
    }

    archiveSelectedSession() {
      cy.get(this.archiveSessionsButton).click();
    }

    deleteSelectedSession() {
      cy.get(this.deleteSessionsButton).click();
    }

    exportSelectedSession(path: string) {
      cy.get(this.exportSessionButton).click();
      cy.get(this.currentPathInput).clearThenType(path);
      cy.wait(500);
      cy.get(this.fileBrowserOkButton).scrollIntoView().click({force: true});
    }

    waitForExportComplete(timeoutMs: number=300000) {
      popupDialog.waitForPopupTitleContain('Session export complete', timeoutMs);
    }

    createNewSession(vdsPath: string, sessionName: string=Cypress.env('workingSessionName'), sessionPath: string=Cypress.env('workingSessionDir')) {
      cy.get(homePage.createANewSessionButton).click();
      cy.get(homePage.sessionNameInput).clearThenType(sessionName);
      cy.get(homePage.sessionPathInput).eq(0).clearThenType(sessionPath);
      cy.get(homePage.baseVDSInput).eq(0).clearThenType(vdsPath);
      cy.get(homePage.createSessionButton).click();
    }

    importSession(zipPath: string, sessionName: string=Cypress.env('workingSessionName'), sessionPath: string=Cypress.env('workingSessionDir'), baseVds: string='') {
      cy.get(this.importSessionsButton).click();
      cy.get(this.sessionNameInput).clearThenType(sessionName);
      cy.get(this.sessionPathInput).clearThenType(sessionPath);
      cy.get(this.importPathInput).clearThenType(zipPath);
      if (baseVds !== '') {
        cy.get(this.selectBaseVdsCheckbox).click({force: true});
        cy.get(this.baseSeismicVolumeInput).clearThenType(baseVds);
      }
      cy.get(this.importSessionOkButton).click({force: true});
    }

    waitForImportComplete(timeoutMs: number=300000) {
      popupDialog.waitForPopupTextContain('Session import complete', timeoutMs);
    }

    waitForHomePageReady(timeoutMs: number=300000) {
      cy.get(this.createANewSessionButton, {timeout: timeoutMs}).should('be.visible');
    }

    waitForAllSessionsReady(timeoutMs: number=300000) {
      cy.get(this.openSessionTile, {timeout: timeoutMs}).should('be.visible');
    }

    waitForReturnImportSessionWhenImportFailed(timeoutMS: number=5000) {
      cy.get('.popup-dialog', {timeout: timeoutMS}).should('contain.text', 'Session import failed');
      cy.get('.popup-dialog > .flex.flex-wrap > .col > button', {timeout: 1000}).should('have.text', 'ok').click();
      cy.get('#session-import-dg-header-title').should('have.text', 'Import Session(s)');
    }
}

export const homePage = new HomePage();
