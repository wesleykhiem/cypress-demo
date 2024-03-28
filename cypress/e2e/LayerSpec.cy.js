import {commonUtils} from '../pages/CommonUtils';
import {homePage} from '../pages/HomePage';
import {mainPage} from '../pages/MainPage';
import {popupDialog} from '../pages/PopupDialog';
import { slowCypressDown } from 'cypress-slow-down'
import userData from '../fixtures/data.json'
// slow down each command by the default amount
// which is 1 second

describe('Create layers', () => {

  beforeEach(() => {
    homePage.visit();
  })

  function drawRandomMask() {
    cy.get(mainPage.renderContainer).find('canvas').then(($canvas) => {
      const w = $canvas.width();
      const h = $canvas.height();

      const x1 = w / 4;
      const y1 = h / 2;
      const x2 = 3 * w / 8;
      const y2 = h / 4;
      const x3 = 5 * w / 8;
      const y3 = y2;
      const x4 = 3 * w / 4;
      const y4 = y1;
      const x5 = x3;
      const y5 = 3 * h / 4;
      const x6 = x2;
      const y6 = y5;

      cy.wrap($canvas).scrollIntoView().click(x1, y1);
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x2, y2);
      cy.wrap($canvas).scrollIntoView().click(x2, y2);
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x3, y3);
      cy.wrap($canvas).scrollIntoView().click(x3, y3);
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x4, y4);
      cy.wrap($canvas).scrollIntoView().click(x4, y4);
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x5, y5);
      cy.wrap($canvas).scrollIntoView().click(x5, y5);
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x6, y6);
      cy.wrap($canvas).scrollIntoView().click(x6, y6);
      cy.wrap($canvas).scrollIntoView().rightclick();
    });

    cy.get(mainPage.acceptMaskButton).click();

    popupDialog.waitForPopupOkButton();
  }

  it('134929 - Create Multiclass DL Layer', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createLabelLayer('TestInterpGroup', 'TestLabel', 'TestDLLayer', '3');
    mainPage.selectLabelLayerNode('TestLabel');
    cy.get(mainPage.labelClassesInput).should('have.value', '3');
    cy.get(mainPage.multiClass1Input).should('have.value', 'Multiclass 1');
    cy.get(mainPage.multiClass2Input).should('have.value', 'Multiclass 2');
    cy.get(mainPage.multiClass3Input).should('have.value', 'Multiclass 3');
  })

  it('134930 - Create a VDS Volume Layer', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    commonUtils.createVDSVolumeLayer('TestInterpGroup', 'TestLayer', userData._132542BodFilterInlineProbVds);
    mainPage.selectVDSLayerNode('TestLayer');
    mainPage.zoomToFitVolume();
    cy.wait(2000);
    mainPage.verifyRendering('134930_VDSVolume');
  })

  it.skip('134932 - Color Fill Inclusion Boundaries', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createLabelLayer('TestInterpGroup', 'TestLabel', 'TestDLLayer', '2');
    cy.get(mainPage.lassoSelectToolButton).click();
    cy.get(mainPage.lassoSelectToolButton).click();
    // Use the "S" hotkey to activate the freeform lasso tool
    //cy.get('body').type('s');
    slowCypressDown(200)
    // Click and hold the mouse button down anywhere on the visible seismic line and draw a circle; let go of the mouse button to finalize the polygon
    cy.get(mainPage.renderContainer).find('canvas').then(($canvas) => {
      const w = $canvas.width();
      const h = $canvas.height();

      const x1 = w / 4;
      const y1 = h / 2;
      const x2 = 3 * w / 8;
      const y2 = h / 4;
      const x3 = 5 * w / 8;
      const y3 = y2;
      const x4 = 3 * w / 4;
      const y4 = y1;
      const x5 = x3;
      const y5 = 3 * h / 4;
      const x6 = x2;
      const y6 = y5;

      // not work
      cy.wrap($canvas).scrollIntoView()
        .trigger('mousedown', x1, y1, { force: true })
        .trigger('mousemove', x2, y2, { force: true })
        //.trigger('mousemove')
        .trigger('mousemove', x3, y3, { force: true })
        //.trigger('mousemove')
        .trigger('mousemove', x4, y4, { force: true })
        //.trigger('mousemove')
        .trigger('mousemove', x5, y5, { force: true })
        //.trigger('mousemove')
        .trigger('mousemove', x6, y6, { force: true })
        //.trigger('mousemove')
        .trigger('mouseup',   x6, y6, { force: true });
    });

    //cy.get(mainPage.lassoSelectToolButton).click();
    cy.wait(5000);
    // Use the "P" hotkey to activate the bucket fill tool

    // Click once inside the flashing black and white boundary
    // Area inside defined polygon is color filled with label

  })
  
  it('134936 - Geobody Tool Function Test', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createLabelLayer();
    mainPage.zoomToFitVolume();

    cy.get(mainPage.geobodyTrackingToolButton).click();
    cy.get(mainPage.trackPeakOption).click();
    cy.get(mainPage.geobodyTrackingToolButton).click({force: true});

    cy.get(mainPage.renderContainer).find('canvas').then(($canvas) => {
      const w = $canvas.width();
      const h = $canvas.height();
      const x1 = w/2;
      const y1 = 7 * h / 16;      
      const x2 = 5 * w / 8;
      const y2 = y1;
      const x3 = 3 * w / 4;
      const y3 = y1;      
      const x4 = x3;
      const y4 = h / 2;
      const x5 = x2;
      const y5 = y4;
      // Click once on the top left boundary of a sequence and drag the mouse to the right 
      cy.wrap($canvas).scrollIntoView().click(x1, y1);
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x2, y2);
      cy.wrap($canvas).scrollIntoView().click(x2, y2);
      // Hold down the Space bar to deactivate the snap and click once anywhere
      cy.get('body').trigger('keydown', { keyCode: 32 })      
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x3, y3);
      cy.wrap($canvas).scrollIntoView().click(x3, y3);
      cy.get('body').trigger('keyup', { keyCode: 32 })
      // Use the Geobody tool to continue picking the boundary of the unit. 
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x4, y4);
      cy.wrap($canvas).scrollIntoView().click(x4, y4);
      // When done, double-click to close and fill
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x5, y5);
      cy.wrap($canvas).scrollIntoView().dblclick(x5, y5);
      cy.wait(2000);
      mainPage.verifyRendering('134936_GeoTool');
    });

    // Click on the "back" arrow (or "ctrl+Z") to undo
    cy.get('body').type('{ctrl}z');
    cy.wait(2000);
    mainPage.verifyRendering('134936_GeoToolUndo');
    // Click on the "forward" arrow (or "ctrl+Y") to redo
    cy.get('body').type('{ctrl}y');
    cy.wait(2000);
    mainPage.verifyRendering('134936_GeoTool'); // Bug here? Have to press Ctrl+Y twice to make it work
  })

  it('134938 - User can Paint and Retain Labels on Seismic with VE turned on', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createLabelLayer('TestInterpGroup', 'TestLabel', 'TestDLLayer', '2');
    mainPage.selectVerticalExaggeration('5');
    cy.wait(1000);
        
    // Click on the Fault tool to activate it and place a label on the displayed seismic
    cy.get(mainPage.faultToolButton).click();

    cy.get(mainPage.renderContainer).find('canvas').then(($canvas) => {
      const x1 = $canvas.width() / 2;
      const y1 = $canvas.height() / 2;

      const x2 = x1;
      const y2 = 2 * ($canvas.height() / 3);
      
      cy.wrap($canvas).scrollIntoView().click(x1, y1);
      cy.wrap($canvas).scrollIntoView().trigger('mousemove', x2, y2);
      cy.wrap($canvas).scrollIntoView().click(x2, y2);
      cy.wrap($canvas).scrollIntoView().rightclick();
    });

    cy.get(mainPage.faultToolButton).click();
    
    mainPage.selectVerticalExaggeration('10');
    mainPage.zoomToFitVolume();
    cy.wait(2000);
    mainPage.verifyRendering('134938_VE10');
    
    mainPage.selectVerticalExaggeration('1');
    mainPage.zoomToFitVolume();
    cy.wait(2000);
    mainPage.verifyRendering('134938_VE1');
    
    cy.get(mainPage.cameraSettingsButton).scrollIntoView().click({force: true});
    mainPage.enableDisableVerticalExaggeration();
    cy.get(mainPage.multiplierInput).should('have.value', '3');
  })

  it('135060 - White Screen when adding standalone label layers', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createLabelLayer('TestInterpGroup', 'TestLabel', ''); // Disable DL layer
    mainPage.selectLabelLayerNode('TestLabel');
  })

  // 134931 - Create a Mask Layer
  // 134799 - Flag to Reverse Polygon Masking
  it('134799 - Flag to Reverse Polygon Masking', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createVerticalMaskLayer('TestInterpGroup', 'Mask_layer_1', false);

    // wait until the polygon tool is ready
    cy.get(mainPage.brushSizeTextInput).should('be.visible');

    drawRandomMask();

    cy.get(mainPage.settingRegionMaskLabel).should('have.text', 'Mask is inside region');
    cy.wait(2000);
    mainPage.verifyRendering('134799_InsideMask');
    
    // select outside mask
    cy.get(mainPage.settingRegionMaskCheckbox).click({force: true});
    cy.get(mainPage.settingRegionMaskLabel).should('have.text', 'Mask is outside region');  
    cy.wait(2000);
    mainPage.verifyRendering('134799_OutsideMask');
  })

  it('134973 - Vertical Mask Layers dont hide on mini map if viz toggled off at Group level', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createVerticalMaskLayer('TestInterpGroup', 'VerticalMask', false);

    // wait until the polygon tool is ready
    cy.get(mainPage.brushSizeTextInput).should('be.visible');
    drawRandomMask();

    cy.get(mainPage.miniMapButton).scrollIntoView().click({force: true});
    cy.wait(2000)
    mainPage.verifyMiniMapRendering('134973_VerticalMaskOn');

    // Toggle On  Vertical Mask layer only     
    // Toggle visualization Off for the entire group 
    mainPage.toggleGroupVisibility('TestInterpGroup');
    cy.wait(2000)
    mainPage.verifyMiniMapRendering('134973_VerticalMaskOff');
  })

  it('135146 - User Should Be able to Delete Layer Labels Without Error', () => {
    commonUtils.createNewSession(userData.bonaventureSubset3DVds);
    mainPage.createLabelLayer('TestInterpGroup', 'TestLabel', 'TestDLLayer');
    mainPage.deleteDLLayerNode('TestDLLayer');
    mainPage.deleteLabelLayerNode('TestLabel');

    cy.get(popupDialog.dialog, {timeout: 1000}).should('not.exist');
    cy.get(`[title="${mainPage.dlLayerPrefix}: TestDLLayer"]`, {timeout: 1000}).should('not.exist');
    cy.get(`[title="${mainPage.labelLayerPrefix}: TestLabel"]`, {timeout: 1000}).should('not.exist');
  })

  it('135492 - Able to Import multiclass layers', () => {
    commonUtils.createNewSessionAndImportLabels(userData.demoGroningenVds, userData.groningen7ClassLabels, '7');
    
    mainPage.zoomToFitVolume();
    cy.wait(2000);
    mainPage.verifyRendering('135492_7Classes');

    mainPage.getSlicePosition().clearThenType('8825');
    // Note the red overlay that appears over the seismic and the color for mask should be set to red
    cy.get('div[title="RGBA(237,  33,  33,  0.4)"]').should('be.visible');    
    mainPage.zoomToFitVolume();
    cy.wait(2000);
    mainPage.verifyRendering('135492_UnlabeledLine');
  })

  // 134925 - Load and Display Labels from Folder
  // 134927 - Create a New Binary Layer
  // 134928 - Create a Label Layer
  it('134925 - Load and Display Labels from Folder', () => {
    commonUtils.createNewSessionAndImportLabels(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel);
    mainPage.selectLabelLayerNode('TestLabel');
    cy.get(mainPage.labelClassesInput).should('have.value', '2');
    cy.get(mainPage.binayClass1Input).should('have.value', 'Probability 0');
    cy.get(mainPage.binayClass2Input).should('have.value', 'Probability 1');
    // Verify Label effort statistics
    cy.get(mainPage.workItem).find('.label').contains('16 of 825 Inlines (1.94%)')
    cy.get(mainPage.workItem).find('.label').contains('0 of 1551 Crosslines (0.00%)')
    cy.get(mainPage.workItem).find('.label').contains('0 of 1001 Slices (0.00%)')
    cy.get(mainPage.workItem).find('.label').contains('16 of 3377 Total (0.47%)')

    cy.wait(3000) // make sure the canvas is rendered
    mainPage.verifyRendering('134925_VDS_Label')
  })

  it.skip('134926 - Mini map activation and line selection', () => {
    commonUtils.createNewSessionAndImportLabels(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel);
    cy.get(mainPage.miniMapButton).scrollIntoView().click({force: true});
    cy.wait(3000);
    mainPage.getSlicePosition().invoke('val').then((pos) => {
      cy.get(mainPage.miniMapContainer).find('canvas.position-relative').then(($canvas) => {
        const x = $canvas.width() / 2;
        const y = $canvas.height() / 4;

        // not work as expected
        cy.wrap($canvas).scrollIntoView().click(x, y);

        mainPage.getSlicePosition().invoke('val').should('not.equal', pos).pause();
      });      
    });
  })

  it('134947 - Import Multiclass Labels Folder', () => {
    commonUtils.createNewSessionAndImportLabels(userData.scarborough3dMigTimeWvlt1Tol1Vds, userData.MulticlassPetSys4IL, '6');
    mainPage.selectDLLayerNode('TestDLLayer');
    mainPage.zoomToFitVolume();
    cy.wait(2000);
    mainPage.verifyRendering('134947_Multiclass');
  })

  it.skip('135638 - User Should be Able to Edit multiclass inference and Global Label Opacity Within IAI Panel ', () => {
    commonUtils.createNewSession(userData.demoGroningenVds);
    mainPage.createLabelLayer('TestInterpGroup', 'TestLabel', 'TestDLLayer', '3');
    mainPage.selectDLLayerNode('TestDLLayer');
    cy.get(mainPage.inferenceColorOpacityInput).clearThenType('10');
    cy.reload();
    cy.get(mainPage.inferenceColorOpacityInput, { timeout: 3000 }).should('have.value', '10');
  })

});
