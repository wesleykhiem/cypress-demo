class PopupDialog {
    dialog = '.popup-dialog';
    submitButton = 'button[type="submit"]';
    popupDialogButton = '.popup-dialog > .flex.flex-wrap > .col > button';
    popupDialogText = '.popup-dialog > .flex > .col > .text-block';
    popupDialogTitle = '.popup-dialog > .flex > .col > span';
    popupDialogSubmitButton = '.popup-dialog > .flex.flex-wrap > .col > button[type="submit"]';

    clickPopupOk() {
      cy.get(this.popupDialogSubmitButton).click();
    }

    waitForPopupTitleContain(title: string, timeoutMs: number=300000) {
      cy.get(this.popupDialogTitle, {timeout: timeoutMs}).should('contain', title);
    }

    waitForPopupTextContain(text: string, timeoutMs: number=300000) {
      cy.get(this.popupDialogText, {timeout: timeoutMs}).should('contain', text);
    }

    waitForPopupOkButton(timeoutMs:number=10000) {
      cy.get(this.popupDialogButton, {timeout: timeoutMs}).should('have.text', 'ok').click();
    }

    waitForPopupDialogDisappear(timeoutMs:number=10000) {
      cy.get(this.popupDialogText, {timeout: timeoutMs}).should('not.exist');
    }
    
  }

  export const popupDialog = new PopupDialog();
