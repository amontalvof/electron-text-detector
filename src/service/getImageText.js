const visionClient = require('./visionClient');
const extractText = require('./extractText');

const getImageText = async (imageBase64) => {
    let base64Data = imageBase64.replace(/^data:image\/png;base64,/, '');

    const request = {
        image: {
            content: base64Data,
        },
        features: [
            {
                type: 'TEXT_DETECTION',
            },
        ],
    };
    const results = await visionClient.annotateImage(request);
    return extractText(results);
};

module.exports = getImageText;
