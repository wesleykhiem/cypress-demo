import { popupDialog } from './PopupDialog';

class MainPage {
    vdsLayerPrefix = 'VDS Layer';
    labelLayerPrefix = 'Label Layer';
    dlLayerPrefix = 'Deep Learning Layer';
    verticalMaskLayerPrefix = 'Vertical Mask Layer';
    groupPrefix = 'Group';
    // Main page
    appLogo = '#appLogo';
    createGroupLayerButton = '[title^="Create Group/Layer"]';
    interpretationGroupHeader = '#interp-group-header-bar';
    staticGroupHeader = '#static-group-header-bar';
    sliceEditorTrayTopRow = '#slice-editor-tray-top-row';
    sliceDirectionSelect = '#slice-direction';
    cameraSettingsButton = '#Camera-Settings';
    zoomToFitVolumeButton = '#Zoom-to-Fit-Volume';
    trainingMetricsGraphButton = '#Training-Metrics-Graph';
    miniMapButton = '#Mini-Map';
    faultToolButton = '#Fault-Tool-F';
    lassoSelectToolButton = '#Lasso-Select-Tool-S';
    geobodyTrackingToolButton = '#Geobody-Tracking-Tool-G';
    trackTroughOption = '[for="Trough"][title="Track Trough Polarity (Z)"]';
    trackZeroCrossingOption = '[for="Zero Crossing"][title=" Track Zero Crossing (X)"]';
    trackPeakOption = '[for="Peak"][title="Track Peak (C)"]';
    workItem = '#workItem';
    colorTableSelect = '#color-table';
    labelClassesInput = '#label-classes';
    binayClass1Input = '#binary_class_1';
    binayClass2Input = '#binary_class_2';
    multiClass1Input = '#multi_class_1';
    multiClass2Input = '#multi_class_2';
    multiClass3Input = '#multi_class_3';
    renderContainer = '#renderer-container';
    numEpochsInput = '#num-epochs';
    startTrainingButton = '[title="Starts Training"]';
    stopTrainingButton = '[title="Stops Training"]';
    realizeButton = '[title="Realize"]';
    epochModelsSelect = '#epoch-models';
    toggleLayerVisibilityButton = '[title="Toggle layer visibility"]';
    toggleGroupVisibilityButton = '[title="Toggle group visibility"]';
    additionalActionsOnLayerButton = '[title="Click for additional actions"]';
    vdsOpacityInput = '#vds-opacity';
    labelClassOpacityInput = '#label-class-opacity';
    inferenceColorOpacityInput = '#inference-color-opacity';
    p2pNetworkFilterCheckbox = '.form-toggle[for="enable-p2p-filter"] > .form-toggle-fill';
    p2pNetworkSelect = '#p2p-network';
    maskOpacityInput = '#mask-opacity';
    trainingProgressBar = '#training-progress-bar';
    inferenceProgressBar = '#inference-progress-bar';
    sessionNameLabel = 'label[title="Session name"]';
    sessionNameInput = '#sessionNameTextInput_input';
    popupModalDialog = '.popup-modal-dialog';

    // Context Menu
    deleteLayerAction = '#context-menu > ul > li[id="contextMenu-Delete Layer"]';
    
    // Create Group/Layer
    layerTypeSelect = '#layer-type-select';
    layerGroupNameInput = '#layer-group-name';
    labelLayerNameInput = '#label-layer-name';
    dlLayerNameInput = '#dl-layer-name';
    maskLayerNameInput = '#mask-layer-name';
    dialogRegionMaskCheckbox = 'label.form-toggle[for="create-dg-mask-inside"] > .form-toggle-fill';
    dlLayerCheckbox = 'label.form-toggle[for="dl-layer-header-checkbox"] > .form-toggle-fill';  
    createNewLayerOkButton = '#create-new-layer-dialog-ok-button';
    inputMaskSelect = '#input-mask';
    vdsLayerNameInput = '#vds-layer-name';
    vdsInput = '#vds';
    
    // Apply Mask
    acceptMaskButton = '#accept-mask-button';
    brushSizeTextInput = '#brushSize-text-input';
    settingRegionMaskCheckbox = 'label.form-toggle[for="vm-settingsbar-mask-inside"] > .form-toggle-fill';
    settingRegionMaskLabel = 'label.label[for="vm-settingsbar-mask-inside"]';

    // Camera Settings
    multiplierInput = '#multiplier';
    cameraSettingsCloseButton = '#camera-settings-dg-header-close-button';  
    verticalExaggerationEnableButton = '.form-toggle[for="vertical-exaggeration"]';
    addPresetButton = '[title^="Add current view as new preset"]';
    deletePresetButton = '[title="Delete current selected preset"]';
    viewPresetsSelect = '#view-presets';
    editPresetsButton = '[title="Edit Presets"]';

    // Import Color Table
    colorTableNameInput = '#color-table-name';
    fileSelector = '#file-selector';
    importColorTableOkButton = '#import-color-table-dg-ok-button';    
    importButtonClass = '.iai-icon-arrow-import';

    // Import Label
    importLabelButton = '#importlabel';
    pathSelectorInput = '[data-testid="path-selector-input"]';
    layerAndNetworkImportOkButton = '#layer-and-network-import-dg-ok-button';

    // Realize Dialog
    generateProbabilityContainer = '#generate-probabilty-dg-container';
    generateProbabilityOkButton = '#generate-probabilty-dg-ok-button';
    faultAndSurfaceOutputsOption = 'label.form-toggle[for="surface-gen"] > .form-toggle-fill';
    outputNameInput = '#output-name';
    outputFolderInput = '#output-folder';
    toggleFaultAndSurfaceOutputButton = 'input.form-toggle-input[type="checkbox"]#surface-gen';
    faultSegmentsRadio = 'label.form-radio-label[for="Fault-Segments"]';
    isoSurfaceForGeobodiesRadio = 'label.form-radio-label[for="Isosurface-for-Geobodies"]';
    generateTSurfCheckbox = '.form-toggle[for="GenerateTSurf-0"] > .form-toggle-fill';
    generateCHACheckbox = '.form-toggle[for="GenerateCHA-0"] > .form-toggle-fill'; 
    ascendingCheckbox = '.form-toggle[for="ascending-0"] > .form-toggle-fill';
    sealBoundaryCheckbox = '.form-toggle[for="SealBoundary-0"] > .form-toggle-fill';
    dipInput = 'input[title^="The minimum angle dot product between two dip vectors allowed"]';
    minProbStartInput = 'input[title^="Minimum probability value where a fault can start to segment"]';
    correlationDistanceInput = 'input[title^="The window vertically in voxels to avoid divergence"]';
    unstabilityAllowanceInput = 'input[title^="How much is a stick allowed to vary from the previous sticks in stck segmentation"]';
    minSticksInput = 'input[title^="The minimum sticks required to extract"]';
    minFaultVerticalSizeInput = 'input[title^="Minimum vertical size of fault"]';

    // Mini Map
    miniMapContainer = '#orientation-map-container';

    // Training Metrics Graph
    trainingLayerNameButton = '#training-layer-name-header-toggle-button';
    selectMetricsSelect = '#select-metrics';
    learningRateInput = '#learning-rate';
    metricsGraphCloseButton = '#metrics-dg-header-close-button';

    editSessionName(name: string) {
      cy.get(this.sessionNameLabel).siblings().first().scrollIntoView().click();
      cy.get(this.sessionNameInput).scrollIntoView().clearThenType(name);
    }

    // click on IAI logo
    backToHomePage() {
      cy.get(this.appLogo).click();
    }

    waitForSessionReady() {
      popupDialog.waitForPopupDialogDisappear(20000);
      cy.get(this.interpretationGroupHeader, {timeout: 10000}).children().should('have.length', 3);
      cy.wait(1000);
      this.waitForInferenceComplete();
    }

    createLabelLayer(group: string='TestInterpGroup', label: string='TestLabel', dl: string='TestDLLayer', classes: string='2', numEpochs: string='5', isCreateNow: boolean=true) {
      cy.get(this.interpretationGroupHeader).children().last().trigger('mouseover');
      cy.get(this.interpretationGroupHeader).children().last().find(this.createGroupLayerButton).click();

      cy.get(this.popupModalDialog).find(this.layerTypeSelect).scrollIntoView().select('Label Layer');
      cy.get(this.popupModalDialog).find(this.layerGroupNameInput).scrollIntoView().clearThenType(group);
      cy.get(this.popupModalDialog).find(this.labelLayerNameInput).scrollIntoView().clearThenType(label);
      if (dl === '') { // Disable DL layer
        this.enableDisableDLLayer();
      }
      else {
        cy.get(this.popupModalDialog).find(this.labelClassesInput).scrollIntoView().clearThenType(classes);
        cy.get(this.popupModalDialog).find(this.dlLayerNameInput).scrollIntoView().clearThenType(dl);
        cy.get(this.popupModalDialog).find(this.numEpochsInput).scrollIntoView().clearThenType(numEpochs);
      }

      if (isCreateNow === true) {
        this.confirmCreateLayer();
        popupDialog.waitForPopupDialogDisappear(30000);
      }
    }

    configAdditionalDLParameters(inputMask: string='', isProb1: boolean=false) {      
      if (inputMask !== '') {
        cy.get(this.popupModalDialog).find(this.inputMaskSelect).scrollIntoView().select(inputMask);
        if (isProb1 === true) {
          cy.get(this.popupModalDialog).find('label').should('have.text', 'Probability 1').siblings('[data-testid="checkbox"]').scrollIntoView().click({force: true});
        }
      }
    }

    importLabel(labelName: string, labelPath: string) {
      this.selectLabelLayerNode(labelName);
      cy.get(this.importLabelButton).scrollIntoView().click();
      cy.get(this.pathSelectorInput).clearThenType(labelPath);
      cy.get(this.layerAndNetworkImportOkButton).click();
      popupDialog.clickPopupOk();
      popupDialog.waitForPopupDialogDisappear(180000);
    }

    createVerticalMaskLayer(group: string, maskName: string, isOutside: boolean=true) {
      cy.get(this.staticGroupHeader).children().last().trigger('mouseover');
      cy.get(this.staticGroupHeader).children().last().find(this.createGroupLayerButton).click();

      cy.get(this.popupModalDialog).find(this.layerTypeSelect).scrollIntoView().select('Vertical Mask Layer');
      cy.get(this.popupModalDialog).find(this.layerGroupNameInput).scrollIntoView().clearThenType(group);
      cy.get(this.popupModalDialog).find(this.maskLayerNameInput).scrollIntoView().clearThenType(maskName);
      if (isOutside === false) {
        cy.get(this.popupModalDialog).find(this.dialogRegionMaskCheckbox).scrollIntoView().click({force: true});
      }

      cy.get(this.createNewLayerOkButton).click();
    }

    createVDSVolumeLayer(group: string, layerName: string, vdsPath: string) {
      cy.get(this.staticGroupHeader).children().last().trigger('mouseover');
      cy.get(this.staticGroupHeader).children().last().find(this.createGroupLayerButton).click();

      cy.get(this.popupModalDialog).find(this.layerTypeSelect).scrollIntoView().select('VDS Volume');
      cy.get(this.popupModalDialog).find(this.layerGroupNameInput).scrollIntoView().clearThenType(group);
      cy.get(this.popupModalDialog).find(this.vdsLayerNameInput).scrollIntoView().clearThenType(layerName);
      cy.get(this.popupModalDialog).find(this.vdsInput).scrollIntoView().clearThenType(vdsPath);

      cy.get(this.createNewLayerOkButton).click();
    }

    selectSliceDirection(direction: string) {
      cy.get(this.sliceDirectionSelect).select(direction);
    }

    selectVerticalExaggeration(ve: string) {
      cy.get(this.cameraSettingsButton).scrollIntoView().click({force: true});
      cy.get(this.multiplierInput).scrollIntoView().clearThenType(ve);
      cy.get(this.cameraSettingsCloseButton).click();
    }

    selectFaultTool() {
      cy.get(this.faultToolButton).click();
    }

    enableDisableVerticalExaggeration() {
      cy.get(this.verticalExaggerationEnableButton).click();
    }

    importColorTable(name: string, filePath: string) {
      cy.get(this.workItem).find(this.importButtonClass).parent().should('have.text', 'import color table').scrollIntoView().click();
      cy.get(this.colorTableNameInput).clearThenType(name);
      cy.get(this.fileSelector).selectFile(filePath, {force: true});
      cy.get(this.importColorTableOkButton).click();
    }

    selectColorTable(name: string) {
      cy.get(this.colorTableSelect).select(name);
    }

    getLayerNode(layerName: string, prefix: string, timeoutMs?: number) {
      if (typeof timeoutMs !== 'undefined') {
        return cy.get(`[title="${prefix}: ${layerName}"]`, {timeout: timeoutMs}).scrollIntoView();
      }
      else {
        return cy.get(`[title="${prefix}: ${layerName}"]`).scrollIntoView();
      }
    }

    selectVDSLayerNode(vdsName: string) {
      this.getLayerNode(vdsName, this.vdsLayerPrefix).click();
    }

    selectLabelLayerNode(labelName: string) {
      this.getLayerNode(labelName, this.labelLayerPrefix).click();
    }

    selectDLLayerNode(dlName: string) {
      this.getLayerNode(dlName, this.dlLayerPrefix).click();
    }

    selectVerticalMaskLayerNode(maskName: string) {
      this.getLayerNode(maskName, this.verticalMaskLayerPrefix).click();
    }

    deleteLabelLayerNode(labelName: string) {
      this.getLayerNode(labelName, this.labelLayerPrefix).children().last().then(($div) => {
        cy.wrap($div).trigger('mouseover');
        cy.wrap($div).find(this.additionalActionsOnLayerButton).click();
        cy.get(this.deleteLayerAction).scrollIntoView().click();
        cy.get(popupDialog.popupDialogSubmitButton).click();
        popupDialog.waitForPopupDialogDisappear();
      });
    }

    deleteDLLayerNode(dlName: string) {
      this.getLayerNode(dlName, this.dlLayerPrefix).children().last().then(($div) => {
        cy.wrap($div).trigger('mouseover');
        cy.wrap($div).find(this.additionalActionsOnLayerButton).click();
        cy.get(this.deleteLayerAction).scrollIntoView().click();
        cy.get(popupDialog.popupDialogSubmitButton).click();
        popupDialog.waitForPopupDialogDisappear();
      });
    }

    verifyRendering(name: string) {
      cy.get(this.renderContainer).find('canvas').matchImageSnapshot(name);
    }

    verifyMiniMapRendering(name: string) {
      cy.get(this.miniMapContainer).find('canvas.position-relative').matchImageSnapshot(name);
    }

    zoomToFitVolume() {
      cy.get(this.zoomToFitVolumeButton).scrollIntoView().click({force: true});
    }

    startTraining() {
      cy.get(this.startTrainingButton).click();
      cy.get(this.workItem).find('.label').last().scrollIntoView().should('contain', 'Epoch Count:');
    }

    stopTraining() {
      cy.get(this.stopTrainingButton).click();
    }

    waitForTrainingComplete(timeoutMs:number=600000, epoch?: string) {
      cy.get(this.startTrainingButton, { timeout: timeoutMs }).should('be.visible');
      if (typeof epoch !== 'undefined') {
        cy.get(this.workItem).find('.label').should('contain', `Epoch Count: ${epoch}`);
      }
    }

    realize() {
      cy.get(this.realizeButton).click();
      cy.wait(2000);
      cy.get(this.generateProbabilityOkButton).click();
    }

    waitForRealizingComplete(timeoutMs:number=2400000) {
      popupDialog.waitForPopupOkButton(timeoutMs);
      cy.wait(2000);
      popupDialog.waitForPopupDialogDisappear();
    }

    trainUntilComplete(dlLayer: string='TestDLLayer', epoch: string='5', timeoutMs: number=600000) {
      mainPage.selectEpochNumber(dlLayer, epoch);
      mainPage.startTraining();
      cy.wait(3000); // delay the search
      mainPage.waitForTrainingComplete(timeoutMs, epoch);
    }

    toggleVDSLayerVisibility(vdsName: string) {
      this.getLayerNode(vdsName, this.vdsLayerPrefix).parent().find(this.toggleLayerVisibilityButton).click();
    }

    toggleLabelLayerVisibility(labelName: string) {
      this.getLayerNode(labelName, this.labelLayerPrefix).parent().find(this.toggleLayerVisibilityButton).click();
    }

    toggleDLLayerVisibility(dlName: string) {
      this.getLayerNode(dlName, this.dlLayerPrefix).parent().find(this.toggleLayerVisibilityButton).click();
    }

    toggleVerticalMaskLayerVisibility(maskName: string) {
      this.getLayerNode(maskName, this.verticalMaskLayerPrefix).parent().find(this.toggleLayerVisibilityButton).click();
    }

    toggleGroupVisibility(groupName: string) {
      this.getLayerNode(groupName, this.groupPrefix).parent().find(this.toggleGroupVisibilityButton).click();
    }

    selectEpochNumber(dlName: string, epoch: string) {
      this.selectDLLayerNode(dlName);
      cy.get(this.workItem).find(this.numEpochsInput).scrollIntoView().clearThenType(epoch);
    }

    getSlicePosition() {
      return cy.get(this.sliceEditorTrayTopRow).children().first().children().eq(1).children().eq(2).find('input');
    }

    selectP2PNetwork(p2pNetwork: string) {
      cy.get(this.p2pNetworkSelect).scrollIntoView().select(p2pNetwork);
    }

    selectMetrics(metrics: string) {
      cy.get(this.trainingMetricsGraphButton).scrollIntoView().click({force: true});
      cy.get(this.trainingLayerNameButton).scrollIntoView().click({force: true});
      cy.get(this.selectMetricsSelect).scrollIntoView().select(metrics, {force: true});
    }

    getLearningRateDecreaseButton() {
      return cy.get(this.learningRateInput).scrollIntoView().parent().siblings().first();
    }

    toggleFaultAndSurfaceOutput() {
      cy.get(this.toggleFaultAndSurfaceOutputButton).scrollIntoView().click({ force: true });
    }
    
    getEditPreset(index: number=0) {
      return cy.get(`#edit-preset-${index}`).scrollIntoView();
    }

    enableDisableDLLayer() {
      cy.get(this.dlLayerCheckbox).scrollIntoView().click();
    }

    confirmCreateLayer() {
      cy.get(this.createNewLayerOkButton).click();
    }

    waitForInferenceComplete(timeoutMs: number=20000) {
      cy.get(this.inferenceProgressBar, {timeout: timeoutMs}).should('not.exist');
    }
  }

  export const mainPage = new MainPage();
