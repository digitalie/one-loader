const loaderUtils = require('loader-utils');
const parse = require('./parse').default;

/**
 * Helper loader that returns content based on requested tag and type
 *
 * @param {string} content
 */
module.exports = function (content) {
    const cb = this.async()
    const parts = parse(content);
    const query = loaderUtils.parseQuery(this.query);

    cb(null, parts[query.tag][query.type])
}
