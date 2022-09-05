const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename:
        '/Users/andymontalvo/Documents/study/electron/text-detector/src/apikey.json',
});

module.exports = client;
