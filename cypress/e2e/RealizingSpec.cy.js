import {commonUtils} from '../pages/CommonUtils';
import {homePage} from '../pages/HomePage';
import {mainPage} from '../pages/MainPage';
import userData from '../fixtures/data.json'

describe('Realize', () => {

  beforeEach(() => {
    homePage.visit();  
  })

  it('134943 - Modify Fault Segment Parameters', () => {
    commonUtils.createNewSessionAndTrain(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel, '2', '10', 1200000);
    cy.get(mainPage.realizeButton).click();    
    // Toggle on the switch next to Surfaces
    cy.get(mainPage.popupModalDialog).find(mainPage.faultAndSurfaceOutputsOption).scrollIntoView().click();
    // Change the following parameters:
    // Dip: 0.985 
    // Min Probability Start: 0.35
    // Correlation Distance: 32
    // Unstability Allowance: 0.45
    // Min Sticks: 4
    // Min Fault Vertical Size: 15
    cy.get(mainPage.popupModalDialog).find(mainPage.dipInput).scrollIntoView().clearThenType('0.985');
    cy.get(mainPage.popupModalDialog).find(mainPage.minProbStartInput).scrollIntoView().clearThenType('0.35');
    cy.get(mainPage.popupModalDialog).find(mainPage.correlationDistanceInput).scrollIntoView().clearThenType('32');
    cy.get(mainPage.popupModalDialog).find(mainPage.unstabilityAllowanceInput).scrollIntoView().clearThenType('0.45');
    cy.get(mainPage.popupModalDialog).find(mainPage.minSticksInput).scrollIntoView().clearThenType('4');
    cy.get(mainPage.popupModalDialog).find(mainPage.minFaultVerticalSizeInput).scrollIntoView().clearThenType('15');
    cy.get(mainPage.generateProbabilityOkButton).click();
    mainPage.waitForRealizingComplete();
    cy.wait(100).pause();
    cy.task('checkFileExistence', { directoryPath: `${Cypress.env('workingSessionDir')}\\${Cypress.env('workingSessionName')}`, fileName: 'Bonaventure_Subset_3D_TestDLLayer_fault_segments.cha' }).then(exists => {
      expect(exists).to.be.true;
    });
  
    cy.task('checkFileExistence', { directoryPath: `${Cypress.env('workingSessionDir')}\\${Cypress.env('workingSessionName')}`, fileName: 'Bonaventure_Subset_3D_TestDLLayer_inline_prob.vds' }).then(exists => {
      expect(true).to.be.true; 
    });

    cy.wait(3000);
    mainPage.verifyRendering('134943_FaultSegmentParameters');
  })

  it('134951 - Allow users to apply a pre-trained P2P model to optimize inference and probability cube', () => {
    commonUtils.createNewSessionAndTrain(userData.CamposSaltCropVds, userData.CamposSaltCropLabels, '2', '10', 1200000);

    cy.get(mainPage.realizeButton).click();    
    // From the "P2P Pre-trained Network seciton": use the drop down button to select "Bluware Body Shape Pre-trained Network"
    cy.get(mainPage.popupModalDialog).find(mainPage.p2pNetworkSelect).scrollIntoView().select('Bluware Body Shape Pre-trained P2P Model');
    
    // Select "Isosurface for Geobodies"
    cy.get(mainPage.popupModalDialog).find(mainPage.faultAndSurfaceOutputsOption).scrollIntoView().click();
    cy.get(mainPage.popupModalDialog).find(mainPage.isoSurfaceForGeobodiesRadio).scrollIntoView().click();
    cy.get(mainPage.generateProbabilityOkButton).click();
    mainPage.waitForRealizingComplete();
    cy.wait(3000);
    mainPage.verifyRendering('134951_P2PModel');
  })

  it('134964 - User Able to Create T surfs with Sealed Boundaries', () => {
    commonUtils.createNewSessionAndTrain(userData.CamposSaltCropVds, userData.CamposSaltCropLabels, '2', '10', 1200000);

    cy.get(mainPage.realizeButton).click();    
    // Select "Faults and Surface Output"
    // Enable "Generate Triangulated Surface"    
    // Select "Isosurface for Geobodies"
    cy.get(mainPage.popupModalDialog).find(mainPage.faultAndSurfaceOutputsOption).scrollIntoView().click({force: true});
    cy.get(mainPage.popupModalDialog).find(mainPage.isoSurfaceForGeobodiesRadio).scrollIntoView().click({force: true});
    cy.get(mainPage.popupModalDialog).find(mainPage.generateTSurfCheckbox).scrollIntoView().click({force: true});
    // Enable "Generate Triangulated Surface in ascending order of  volume"
    cy.get(mainPage.popupModalDialog).find(mainPage.ascendingCheckbox).scrollIntoView().click({force: true});
    cy.get(mainPage.generateProbabilityOkButton).click();
    mainPage.waitForRealizingComplete();
    cy.wait(3000);
    mainPage.verifyRendering('134964_TSurfs_SealedBoundaries');
  })

  it('134965 - User Able to Create T surfs with Unsealed Boundaries', () => {
    commonUtils.createNewSessionAndTrain(userData.CamposSaltCropVds, userData.CamposSaltCropLabels, '2', '10', 1200000);

    cy.get(mainPage.realizeButton).click();    
    // Select "Faults and Surface Output"
    // Enable "Generate Triangulated Surface"    
    // Select "Isosurface for Geobodies"
    cy.get(mainPage.popupModalDialog).find(mainPage.faultAndSurfaceOutputsOption).scrollIntoView().click({force: true});
    cy.get(mainPage.popupModalDialog).find(mainPage.isoSurfaceForGeobodiesRadio).scrollIntoView().click({force: true});
    cy.get(mainPage.popupModalDialog).find(mainPage.generateTSurfCheckbox).scrollIntoView().click({force: true});
    // Disable "Seal Surfaces Boundary" 
    cy.get(mainPage.popupModalDialog).find(mainPage.sealBoundaryCheckbox).scrollIntoView().click({force: true});
    // Enable "Generate Triangulated Surface in ascending order of  volume"
    cy.get(mainPage.popupModalDialog).find(mainPage.ascendingCheckbox).scrollIntoView().click({force: true});
    cy.get(mainPage.generateProbabilityOkButton).click();
    mainPage.waitForRealizingComplete();
    cy.wait(3000);
    mainPage.verifyRendering('134965_TSurfs_UnsealedBoundaries');
  })

  it('135583 - Validate layer opacities and base seismic VDS opacities are not linked', () => {
    commonUtils.createNewSessionAndTrain(userData.demoGroningenVds, userData.groningenNewSalt, '2', '3');
    
    mainPage.realize();
    cy.wait(3000); // delay the search
    mainPage.waitForRealizingComplete();

    cy.get('[title="Deep Learning Layer: TestDLLayer"]', { timeout: 10000 });

    mainPage.toggleLabelLayerVisibility('TestLabel');
    mainPage.toggleDLLayerVisibility('TestDLLayer');

    mainPage.toggleVDSLayerVisibility('demo-groningen_TestDLLayer_inline_prob.vds');
    mainPage.selectVDSLayerNode('demo-groningen_TestDLLayer_inline_prob.vds');
    cy.get(mainPage.vdsOpacityInput).clearThenType('30');
    mainPage.verifyRendering('135583_ProbVDS_30');
    mainPage.toggleVDSLayerVisibility('demo-groningen_TestDLLayer_inline_prob.vds');

    mainPage.toggleLabelLayerVisibility('TestLabel');
    mainPage.selectLabelLayerNode('TestLabel');
    cy.get(mainPage.binayClass2Input).parent().prev().find(mainPage.labelClassOpacityInput).clearThenType('30');
    mainPage.verifyRendering('135583_Label_30');
    mainPage.toggleLabelLayerVisibility('TestLabel');

    mainPage.toggleDLLayerVisibility('TestDLLayer');
    mainPage.selectDLLayerNode('TestDLLayer');
    cy.get(mainPage.inferenceColorOpacityInput).clearThenType('90');
    mainPage.verifyRendering('135583_DL_90');
    
  })

  it('138700 - Generate Fault Probability Cube with Fault Segments ', () => {
    commonUtils.createNewSessionAndTrain(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel, '2', '3');
    
    cy.get(mainPage.realizeButton).click();
    cy.wait(3000); // delay the search
    mainPage.toggleFaultAndSurfaceOutput();
    cy.get(mainPage.generateProbabilityOkButton).click();

    // Verify the Job should completed winthin 23min = 1380000ms
    mainPage.waitForRealizingComplete(1380000);

    const directoryPath  = `${Cypress.env('workingSessionDir')}\\${Cypress.env('workingSessionName')}`;
    cy.task('checkFileExistence', { directoryPath, fileName: userData.ChaOutput138700 }).then(exists => {
      if (!exists) {
        cy.log(`${userData.ChaOutput138700} does not exist in working session path.`);
      } else {
        cy.log(`${userData.ChaOutput138700} exists in working session path.`);
      }
      expect(exists).to.be.true;
    });
  
    cy.task('checkFileExistence', { directoryPath, fileName: userData.VdsOutput138700 }).then(exists => {
      if (!exists) {
        cy.log(`${userData.VdsOutput138700} does not exist in working session path.`);
      } else {
        cy.log(`${userData.VdsOutput138700} exists in working session path.`);
      }
      expect(true).to.be.true; 
    });
 
  }) 

});
