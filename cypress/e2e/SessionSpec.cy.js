import {commonUtils} from '../pages/CommonUtils';
import {homePage} from '../pages/HomePage';
import {mainPage} from '../pages/MainPage';
import userData from '../fixtures/data.json'
import { popupDialog } from '../pages/PopupDialog';

describe('Manipulate a session', () => {

  beforeEach(() => {
    homePage.visit();
  })

  // 134941 - Export 4x Session .zip
  // 134945 - Export and Re-Import 4x Session
  it('134945 - Export and Re-Import 4x Session', () => {
    commonUtils.createNewSessionAndTrain(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel, '2', '10', 1200000);
    cy.wait(2000);
    mainPage.verifyRendering('134945_10Epoch');

    mainPage.backToHomePage();
    homePage.waitForHomePageReady();
    homePage.selectFirstSession();
    homePage.exportSelectedSession(Cypress.env('workingSessionDir'));
    homePage.waitForExportComplete();
    cy.get(popupDialog.popupDialogText).invoke('text').then((sessionZipPath) => {
      popupDialog.clickPopupOk();
      cy.task('generateUniqueName').then((sessionName) => {
        homePage.importSession(sessionZipPath, sessionName);
        homePage.waitForImportComplete();
        popupDialog.clickPopupOk();

        homePage.waitForAllSessionsReady();
        homePage.openFirstSession();
        mainPage.waitForSessionReady();
        cy.wait(5000);
        mainPage.verifyRendering('134945_10Epoch');
      });
    });
  })

  it.skip('134962 - Apply Pre-Trained P2P Networks to Inference and probability', () => {
    cy.task('generateUniqueName', 'Import-132542').then((sessionName) => {
      commonUtils.importSession(userData.BonaveSub4ntwkTrainedQaZip, sessionName, Cypress.env('workingSessionDir'), userData.bonaventureSubset3DVds);
      homePage.waitForImportComplete();
      popupDialog.clickPopupOk();

      homePage.waitForAllSessionsReady();
      homePage.openFirstSession();
      mainPage.waitForSessionReady();
      cy.wait(5000);
      mainPage.zoomToFitVolume();
      mainPage.verifyRendering('134962_AllLayers');

      // Click on the DL layer "Deep Faults" and display inference only from this layer
      mainPage.toggleLabelLayerVisibility('Faulted Zone');
      mainPage.toggleDLLayerVisibility('Faulted Zone');

      mainPage.toggleLabelLayerVisibility('Shallow');
      mainPage.toggleDLLayerVisibility('Shallow');

      mainPage.selectDLLayerNode('Deep Faults');

      // Keep an eye on the inference results and select "Bluware Line Shape Pre-Trained P2P Model A" from the drop-down P2P Network menu
      cy.get(mainPage.p2pNetworkFilterCheckbox).scrollIntoView().click({force: true});
      mainPage.selectP2PNetwork('Bluware Line Shape Pre-trained P2P Model A');
      cy.wait(5000);
      mainPage.zoomToFitVolume();
      mainPage.verifyRendering('134962_DeepFaults_ModelA');
      
      // Keep an eye on the inference results and select "Bluware Line Shape Pre-Trained P2P Model B" from the drop-down P2P Network menu
      mainPage.selectP2PNetwork('Bluware Line Shape Pre-trained P2P Model B');
      cy.wait(5000);
      mainPage.zoomToFitVolume();
      mainPage.verifyRendering('134962_DeepFaults_ModelB');

      // Keep an eye on the inference results and select "Bluware Line Shape Pre-Trained P2P Model C" from the drop-down P2P Network menu
      mainPage.selectP2PNetwork('Bluware Line Shape Pre-trained P2P Model C');
      cy.wait(5000);
      mainPage.zoomToFitVolume();
      mainPage.verifyRendering('134962_DeepFaults_ModelC');

      // Activate the Faulted Zone layer and hide all other label and DL layers 
      mainPage.toggleLabelLayerVisibility('Deep Faults');
      mainPage.toggleDLLayerVisibility('Deep Faults');
      mainPage.toggleLabelLayerVisibility('Faulted Zone');
      mainPage.toggleDLLayerVisibility('Faulted Zone');
      mainPage.selectDLLayerNode('Faulted Zone');

      // Keep an eye on the inference results and select "Bluware Body Shape Pre-trained P2P Model" from the drop-down P2P Network menu
      mainPage.selectP2PNetwork('Bluware Body Shape Pre-trained P2P Model');
      cy.wait(5000);
      mainPage.zoomToFitVolume();
      mainPage.verifyRendering('134962_FaultedZone_Model');

      // Click on the Realize icon
      // Name the output "132542-body-filter"
      cy.get(mainPage.realizeButton).click();
      cy.get(mainPage.outputNameInput).scrollIntoView().clearThenType('132542-body-filter');
      cy.get(mainPage.generateProbabilityOkButton).click();
      cy.wait(3000); // delay the search
      mainPage.waitForRealizingComplete();

      cy.wait(5000);
      mainPage.zoomToFitVolume();
      mainPage.verifyRendering('134962_FaultedZone_Realized');
    });
  })

  it('137364 - Importing Session with the Wrong Base VDS Will Return User to the Home Page Rather Than the Import Page ', () => {
    //Import Session with a base vds that does not match the session
    cy.task('generateUniqueName', 'Import-137364').then((sessionName) => {
      commonUtils.importSession(userData.ImportSession137364, sessionName, Cypress.env('workingSessionDir'), userData.demoGroningenVds);
      //Return Import Session(s)
      homePage.waitForReturnImportSessionWhenImportFailed();
    });
  })

  it('134937 - Change Seismic Line Orientation', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    // Verify Inline image
    mainPage.verifyRendering('134937_Inline');

    // Verify Crossline image
    mainPage.selectSliceDirection('Crossline');
    cy.wait(5000);
    mainPage.verifyRendering('134937_Crossline');

    // Verify Slice image
    mainPage.selectSliceDirection('Slice');
    cy.wait(5000);
    mainPage.verifyRendering('134937_Slice');
  })

  // fail without deleting db which contains existing user-defined color tables
  it.skip('134939 - Import and Change Seismic Color Table', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.selectVDSLayerNode('Bonaventure_Subset_3D.vds');

    cy.fixture('data.json').then((data) => {
      // Navigate to and select the file below: \\10.3.3.5\Hue\RegressionTestData_BMLE_new\ColorTables\CMY_for_Bluware.alut
      commonUtils.importColorTable('Imported', userData.cmyForBluwareAlutColorTable);

      mainPage.selectColorTable('Imported');
      cy.wait(3000);
      mainPage.verifyRendering('134939_CMY_for_Bluware');

      // Navigate to and select the file below: \\10.3.3.5\Hue\RegressionTestData_BMLE_new\ColorTables\Matplt_Jet_256.cmap
      commonUtils.importColorTable('Imported1', userData.matpltJet256CmapColorTable);

      mainPage.selectColorTable('Imported1');
      cy.wait(3000);
      mainPage.verifyRendering('134939_Matplt_Jet_256');

      // Use the drop-down menu to set the seismic color table back to Black and White
      mainPage.selectColorTable('Black and White')
      cy.wait(3000);
      mainPage.verifyRendering('134939_BlackAndWhite')
    })
  })

  it('134940 - Archive and Delete Sessions via Thumbnail', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.backToHomePage();
    homePage.waitForHomePageReady();

    homePage.selectFirstSession();
    homePage.archiveSelectedSession();
    cy.get(`div[title="${Cypress.env('workingSessionName')}"]`).should('not.exist');
    homePage.clickShowArchivedSessions();
    cy.get(`div[title="${Cypress.env('workingSessionName')}"]`).should('be.visible');
    homePage.selectFirstSession();
    homePage.deleteSelectedSession();

    popupDialog.clickPopupOk();
    popupDialog.clickPopupOk();
  })

  it('134944 - Change Session Name in UI', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    cy.get(mainPage.sessionNameLabel).should('have.text', Cypress.env('workingSessionName'));
    mainPage.editSessionName('EditedSession');
    mainPage.backToHomePage();
    homePage.waitForHomePageReady();
    homePage.getFirstSessionTile().find('div[title="EditedSession"]').should('be.visible');
  })

  it('134957 - Set View for the Camera Display', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    cy.get(mainPage.cameraSettingsButton).scrollIntoView().click({force: true});
    cy.get(mainPage.renderContainer).find('canvas').then(($canvas) => {
      // From the camera window: create a preset called "zoomout"
      mainPage.zoomToFitVolume();
      cy.wrap($canvas).scrollIntoView().click({force: true});
      cy.wrap($canvas).scrollIntoView().trigger("wheel", { deltaY: 100, wheelDelta: 120, wheelDeltaX: 0, wheelDeltaY: 120, bubbles: true, force: true});
      cy.get(mainPage.addPresetButton).scrollIntoView().click({force: true});
      cy.get(mainPage.editPresetsButton).scrollIntoView().click({force: true});
      mainPage.getEditPreset(0).clear({force: true}).type('zoomout', {force: true}).type('{enter}', {force: true});

      // From the camera window: create a preset called "zoomin"
      mainPage.zoomToFitVolume();
      cy.wrap($canvas).scrollIntoView().click({force: true});
      cy.wrap($canvas).scrollIntoView().trigger("wheel", { deltaY: -100, wheelDelta: 120, wheelDeltaX: 0, wheelDeltaY: 120, bubbles: true, force: true});
      cy.get(mainPage.addPresetButton).scrollIntoView().click({force: true});
      mainPage.getEditPreset(1).clear({force: true}).type('zoomin', {force: true}).type('{enter}', {force: true});

      // From the camera set preset to zoomout
      cy.get(mainPage.viewPresetsSelect).scrollIntoView().select('zoomout', {force: true});
      cy.get(mainPage.cameraSettingsCloseButton).click();
      mainPage.verifyRendering('134957_ZoomOut');

      // From the camera set preset to zoomin
      cy.get(mainPage.cameraSettingsButton).scrollIntoView().click({force: true});
      cy.get(mainPage.viewPresetsSelect).scrollIntoView().select('zoomin', {force: true});
      cy.get(mainPage.cameraSettingsCloseButton).click();
      mainPage.verifyRendering('134957_ZoomIn');
      
      // From the camera window: delete the two presets 
      cy.get(mainPage.cameraSettingsButton).scrollIntoView().click({force: true});
      cy.get(mainPage.viewPresetsSelect).scrollIntoView().select('zoomin', {force: true});
      cy.get(mainPage.deletePresetButton).scrollIntoView().click({force: true});
      cy.get(mainPage.viewPresetsSelect).scrollIntoView().select('zoomout', {force: true});
      cy.get(mainPage.deletePresetButton).scrollIntoView().click({force: true});

    })
  })

});
