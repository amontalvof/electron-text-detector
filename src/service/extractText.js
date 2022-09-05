const get = require('lodash.get');

const extractText = (results) => {
    const result = results[0];
    return get(result, 'textAnnotations[0].description');
};

module.exports = extractText;
