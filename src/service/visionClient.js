const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: '< your api key file path >',
});

module.exports = client;
