import {commonUtils} from '../pages/CommonUtils';
import {homePage} from '../pages/HomePage';
import {mainPage} from '../pages/MainPage';
import userData from '../fixtures/data.json'
import {popupDialog} from '../pages/PopupDialog';

describe('Delete all existing sessions', () => {
  it('Delete all existing sessions', () => {
    homePage.visit();
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.backToHomePage();
    homePage.waitForHomePageReady();
    
    // delete all sessions
    cy.get(homePage.selectSessionButton).each(($el, index, $list) => {
      cy.wrap($el).scrollIntoView().click();
    });
    homePage.deleteSelectedSession();
    popupDialog.clickPopupOk();
    popupDialog.clickPopupOk();
    popupDialog.waitForPopupDialogDisappear();
  })
});
