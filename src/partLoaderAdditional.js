const loaderUtils = require('loader-utils');
const parse = require('./parse').default;

/**
 * Helper loader that returns content based on requested part id
 *
 * @param {string} content
 */
module.exports = function (content) {
    const parts = parse(content);
    const query = loaderUtils.parseQuery(this.query);
    let output;
    parts.forEach((part) => {
        if (part.id === query.id) {
            output = part.content;
            return false;
        }
    });
    return output;
}
