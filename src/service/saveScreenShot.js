const { desktopCapturer } = require('electron');
const determineScreenShotSize = require('./determineScreenShotSize');

const saveScreenShot = async (devicePixelRatio) => {
    const thumbSize = determineScreenShotSize(devicePixelRatio);
    let options = { types: ['screen'], thumbnailSize: thumbSize };

    const sources = await desktopCapturer.getSources(options);
    return sources.map((item) => item.thumbnail.toDataURL());
};

module.exports = saveScreenShot;
