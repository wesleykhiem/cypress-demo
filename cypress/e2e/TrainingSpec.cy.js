import {commonUtils} from '../pages/CommonUtils';
import {homePage} from '../pages/HomePage';
import {mainPage} from '../pages/MainPage';
import userData from '../fixtures/data.json'

describe('Train', () => {

  beforeEach(() => {
    homePage.visit();  
  })

  it('134934 - Loss Function Curve and Learning Rate', () => {
    commonUtils.createNewSessionAndImportLabels(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel, '2', '4');

    mainPage.selectDLLayerNode('TestDLLayer');
    mainPage.startTraining();
    
    // Click on the ^ to the right of Training and select Display Metrics Graph
    // Use the pull-down menu on the top of the Metrics graph to change the displayed property to Dice 
    mainPage.selectMetrics('dice');
    cy.get(mainPage.learningRateInput).invoke('val').then(parseFloat).should('eq', 0.005);

    // After four epochs of training, click on the "-" button at the top of the loss function graph to lower the learning rate one step
    mainPage.waitForTrainingComplete(600000, '4');
    mainPage.getLearningRateDecreaseButton().then(($button) => {
      cy.wrap($button).should('not.be.disabled');
      cy.wait(5000); // TBD - make sure training is not on-going on background
      cy.wrap($button).click({force: true});
    });

    // Learning rate decresed frrom 0.005 to 0.003536
    cy.get(mainPage.learningRateInput).should(($input) => {
      const n = parseFloat($input.val());    
      expect(n).to.be.closeTo(0.003536, 0.0001);
    });
    
    // After two more epochs of training, click on the "-" again to drop the learning rate one step
    mainPage.selectEpochNumber('TestDLLayer', '2')
    mainPage.startTraining();
    cy.wait(2000);
    mainPage.waitForTrainingComplete(300000, '6');
    mainPage.getLearningRateDecreaseButton().then(($button) => {
      cy.wrap($button).should('not.be.disabled');
      cy.wait(5000); // TBD - make sure training is not on-going on background
      cy.wrap($button).click({force: true});
    });

    // Learning rate decreased from 0.003536 to 0.0025
    cy.get(mainPage.learningRateInput).should(($input) => {
      const n = parseFloat($input.val());    
      expect(n).to.be.closeTo(0.0025, 0.0001);
    });

    // After one more epoch, click on the Training button again to turn off the training process
    mainPage.selectEpochNumber('TestDLLayer', '1')
    mainPage.startTraining();
    cy.wait(2000);
    mainPage.waitForTrainingComplete(150000, '7');
    
    // Toggle the inference off and on again to ensure good  fit between the predicted faults and the inference
    cy.get(mainPage.metricsGraphCloseButton).click({force: true});
    mainPage.toggleDLLayerVisibility('TestDLLayer');
    mainPage.toggleDLLayerVisibility('TestDLLayer');
    cy.wait(2000);
    mainPage.verifyRendering('134934_LearningRate')
  })

  it.skip('134942 - Use existing network as mask for new network', () => {
    commonUtils.createNewSession(userData.NH0301IAICompVds);
    mainPage.createLabelLayer('TestInterpGroup_1', 'Basement_label', 'Basement', '2', '6');
    commonUtils.importLabel('Basement_label', userData.TrollBasementLabels);

    mainPage.selectDLLayerNode('Basement');
    mainPage.startTraining();
    cy.wait(3000); // delay the search
    mainPage.waitForTrainingComplete();
    cy.get(mainPage.workItem).find('.label').contains('Epoch Count: 6');

    mainPage.createLabelLayer('TestInterpGroup_2', 'ShallowFaults_label', 'ShallowFaults', '2', '5', false);
    mainPage.configAdditionalDLParameters('Basement', true);
    mainPage.confirmCreateLayer();

    mainPage.toggleDLLayerVisibility('Basement');
    mainPage.toggleLabelLayerVisibility('Basement_label');
    mainPage.verifyRendering('134942_ShallowFaults');
  })

  it.skip('134956 - Allow users to have an opacity slider for VDS cubes and input masks.', () => {
    commonUtils.createNewSession(userData.NH0301IAICompVds);
    mainPage.createLabelLayer('TestInterpGroup_1', 'Basement_label', 'Basement', '2', '6');
    commonUtils.importLabel('Basement_label', userData.TrollBasementLabels);

    mainPage.selectDLLayerNode('Basement');
    mainPage.startTraining();
    cy.wait(3000); // delay the search
    mainPage.waitForTrainingComplete();
    cy.get(mainPage.workItem).find('.label').contains('Epoch Count: 6');

    mainPage.createLabelLayer('TestInterpGroup_2', 'ShallowFaults_label', 'ShallowFaults', '2', '5', false);
    mainPage.configAdditionalDLParameters('Basement', true);
    mainPage.confirmCreateLayer();

    mainPage.toggleDLLayerVisibility('Basement');
    mainPage.toggleLabelLayerVisibility('Basement_label');

    mainPage.selectDLLayerNode('ShallowFaults');
    cy.get(mainPage.maskOpacityInput).scrollIntoView().clearThenType('10');
    cy.wait(3000);
    mainPage.verifyRendering('134956_MaskOpacity10');

    cy.get(mainPage.maskOpacityInput).scrollIntoView().clearThenType('100');
    cy.wait(3000);
    mainPage.verifyRendering('134956_MaskOpacity100');
  })

  it('134953 - Ability to save the last 5 epochs with an arrow button', () => {
    commonUtils.createNewSessionAndTrain(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel, '2', '6', 1200000);
    mainPage.selectDLLayerNode('TestDLLayer');
    cy.get(mainPage.epochModelsSelect).scrollIntoView().find('option').should('have.length', 5);

    cy.get(mainPage.epochModelsSelect).find('option:selected').should('have.text', '6');
    cy.wait(2000);
    mainPage.zoomToFitVolume();
    mainPage.verifyRendering('134953_Epoch6');

    cy.get(mainPage.epochModelsSelect).select('5');
    cy.wait(2000);
    mainPage.zoomToFitVolume();
    mainPage.verifyRendering('134953_Epoch5');

    cy.get(mainPage.epochModelsSelect).select('4');
    cy.wait(2000);
    mainPage.zoomToFitVolume();
    mainPage.verifyRendering('134953_Epoch4');

    cy.get(mainPage.epochModelsSelect).select('3');
    cy.wait(2000);
    mainPage.zoomToFitVolume();
    mainPage.verifyRendering('134953_Epoch3');

    cy.get(mainPage.epochModelsSelect).select('2');
    cy.wait(2000);
    mainPage.zoomToFitVolume();
    mainPage.verifyRendering('134953_Epoch2');
  })

  it('134972 - Select Epoch Dropdown Menu Disappears if Value is set to 1', () => {
    commonUtils.createNewSessionAndTrain(userData.bonaventureSubset3DVds, userData.bonaventureSubset3DLabel, '2', '4', 600000);
    mainPage.selectDLLayerNode('TestDLLayer');
    
    cy.get(mainPage.epochModelsSelect).scrollIntoView().select('1');
    cy.get(mainPage.epochModelsSelect).find('option').should('have.length', 4);
    cy.wait(2000);
    mainPage.zoomToFitVolume();
    mainPage.verifyRendering('134972_Epoch1');
  })

  it('135491 - Alt+S hotkey should only hide seismic VDS and inactive layers from viewport', () => {
    commonUtils.createNewSessionAndTrain(userData.CamposSaltCropVds, userData.CamposSaltCropLabels, '2', '2');

    cy.get('body').type('{alt}s');
    mainPage.zoomToFitVolume();
    cy.wait(2000);
    mainPage.verifyRendering('135491_DLLayerOnly');
  })

  it('135584 - Use alt+s to display labels and show/hide seismic visualization ', () => {
    commonUtils.createNewSessionAndTrain(userData.demoGroningenVds, userData.groningenNewSalt, '2', '3');

    cy.get('body').type('{alt}s');
    mainPage.zoomToFitVolume();
    cy.wait(3000);
    mainPage.verifyRendering('135584_LabelOnly');

    cy.get('body').type('{alt}s');
    mainPage.zoomToFitVolume();
    cy.wait(3000);
    mainPage.verifyRendering('135584_SeismicDLLayerLabel');

  });

});
