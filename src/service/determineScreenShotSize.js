const electron = require('electron');

const electronScreen = electron.screen;

function determineScreenShotSize(devicePixelRatio) {
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    // return {
    //     width: maxDimension * devicePixelRatio,
    //     height: maxDimension * devicePixelRatio,
    // };
    return {
        width: screenSize.width,
        height: screenSize.height,
    };
}

module.exports = determineScreenShotSize;
