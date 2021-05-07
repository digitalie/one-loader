const loaderUtils = require('loader-utils');
const parse = require('./parse').default;
const {getRequireAdditional} = require('./require');

/**
 * Helper loader that returns content based on requested part id
 *
 * @param {string} content
 */
module.exports = function (content) {
    const parts = parse(content);
    const query = loaderUtils.parseQuery(this.query);
    const resource = loaderUtils.getRemainingRequest(this);

    let primaryPart;
    let output = '';
    parts.forEach((part) => {
        if (part.id === query.id) {
            primaryPart = part;
        } else {
            // add each additional resource as a require() to the primary part
            output += getRequireAdditional(this, part, query.options, resource);
        }
    });
    return output + primaryPart.content;
}
