import {homePage} from './HomePage';
import {mainPage} from './MainPage';
import {popupDialog} from './PopupDialog';
import userData from '../fixtures/data.json'

class CommonUtils {
  createNewSession(vdsRelativePath: string, sessionName: string=Cypress.env('workingSessionName'), sessionPath: string=Cypress.env('workingSessionDir')) {
    homePage.waitForHomePageReady();
    homePage.createNewSession(userData.dataPath + vdsRelativePath, sessionName, sessionPath);
    mainPage.waitForSessionReady();
  }

  importSession(zipRelativePath: string, sessionName: string=Cypress.env('workingSessionName'), sessionPath: string=Cypress.env('workingSessionDir'), baseVdsRelativePath: string='') {
    homePage.importSession(userData.dataPath + zipRelativePath, sessionName, sessionPath, userData.dataPath + baseVdsRelativePath);
  }

  importLabel(labelName: string, labelRelativePath: string) {
    mainPage.importLabel(labelName, userData.dataPath + labelRelativePath);
  }

  createNewSessionAndImportLabels(vdsRelativePath: string, labelsRelativePath: string, classes: string='2', epoch: string='5') {
    this.createNewSession(vdsRelativePath);
    mainPage.createLabelLayer('TestInterpGroup', 'TestLabel', 'TestDLLayer', classes, epoch);
    this.importLabel('TestLabel', labelsRelativePath);
  }
      
  createNewSessionAndTrain(vdsRelativePath: string, labelsRelativePath: string, classes: string='2', epoch: string='5', timeout: number=600000) {
    this.createNewSessionAndImportLabels(vdsRelativePath, labelsRelativePath, classes, epoch);
    mainPage.trainUntilComplete('TestDLLayer', epoch, timeout);
  }

  importColorTable(name: string, relativeFilePath: string) {
    mainPage.importColorTable(name, userData.dataPath + relativeFilePath);
  }

  createVDSVolumeLayer(group: string, layerName: string, vdsRelativePath: string) {
    mainPage.createVDSVolumeLayer(group, layerName, userData.dataPath + vdsRelativePath);
  }
}
 
export const commonUtils = new CommonUtils();