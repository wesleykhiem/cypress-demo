import {homePage} from '../pages/HomePage';

describe('Visit Home Page', () => {
    beforeEach(() => {
        homePage.visit();
    })
    
    it('successfully visits the IAI local', () => {
        // Verify URL
        cy.url().should('include', 'localhost:3090');
    });

    it('has all required buttons', () => {
        // Verify required buttons
        cy.get('div[title="Create a New Session"]').should('exist');
        cy.get('div[title="Import Session(s)"]').should('exist');
        cy.get('div[title="Show Archived Session(s)"]').should('exist');
    });

    it('can click on the "Create a New Session" button successfully', () => {
        cy.get(homePage.createANewSessionButton).click();
        cy.get('#project-creator-dg-header-title').should('contain', 'Create Session');
    });
});
